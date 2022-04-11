import {
  PortfolioInfo,
  Photo,
  PortfolioThumbnail,
  JSONPortfolioInfo,
} from '../types/types'
import { s3Client, bucketRegion, bucketName } from './s3Client'
import {
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3'
import probe, { ProbeResult } from 'probe-image-size'
import fs from 'fs'
import { join } from 'path'

const portfolioDirec = join(process.cwd(), 'portfolios')

const bucketURL = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/`

export const getPortfolioSlugs = async (): Promise<string[]> => {
  // params for req
  const params: ListObjectsV2CommandInput = {
    Bucket: bucketName, // from s3Client
    Prefix: 'portfolio/', // the main portfolio list
    Delimiter: '/', // get all root prefixes in portfolio prefix
  }

  // make command
  const command = new ListObjectsV2Command(params)

  // send command
  const response = await s3Client.send(command)

  // create iterator string
  const slugs: string[] = []

  // iterate over all prefixes
  response.CommonPrefixes?.map((prefix) => {
    if (prefix.Prefix) {
      const filteredPrefix = prefix.Prefix.slice(10, -1) // 10, as that removes portfolio/

      // append to slugs list
      slugs.push(filteredPrefix)
    }
  })

  return slugs
}

export const getPortfolioBySlug = async (
  slug: string
): Promise<PortfolioInfo> => {
  // make a call to getPhotosFromPortfolio, passing in slug
  const photos = await getPhotosFromPortfolio(slug)

  // add written information about portfolio
  const portfolioInfo = await getPortfolioInformation(slug)
  // return the portfolioInfo object

  return {
    title: portfolioInfo.title,
    slug: slug,
    photos: photos,
    description: portfolioInfo.description,
  }
}

/**
 * collects all photos from a specified prefix
 *
 * @param slug a prefix name for an s3 bucket
 */
export const getPhotosFromPortfolio = async (
  slug: string
): Promise<Photo[]> => {
  // set prefix
  const prefix = 'portfolio/' + slug + '/'
  const params: ListObjectsV2CommandInput = {
    Bucket: bucketName,
    Prefix: prefix,
  }

  // make command
  const command = new ListObjectsV2Command(params)

  // send command, get response
  const response: ListObjectsV2CommandOutput = await s3Client.send(command)

  // create an array to hold URLs of photos
  const photoURLs = []

  // the base bucket URL

  // iterate starting with second object, first is just the prefix name
  let index = 1
  if (response.Contents) {
    while (index < response.Contents?.length) {
      // append tag
      const url = bucketURL + response.Contents[index].Key

      // only read in jpg images, and not the header (it is specifically cropped)
      if (url.slice(-3) == 'jpg' && url.slice(-10) != 'header.jpg') {
        photoURLs.push(url)
      }
      index = index + 1
    }
  }

  // fetch the width and height using probe
  const images = await Promise.all(
    photoURLs.map(async (url) => {
      const photoInfo = await probe(url)

      // TODO: handle getting the image name, if we save the image with the specific name, then can use that as alt text too

      const newImage: Photo = {
        url: url,
        width: photoInfo.width,
        height: photoInfo.height,
      }

      return newImage
    })
  )

  // return photos
  return images
}

/**
 * returns a header image for each portfolio
 * @param slug a prefix name for an s3 bucket
 */
export const getPortfolioHeaderImage = async (slug: string): Promise<Photo> => {
  // TODO: come back to this idea of randomly selecting photos
  // change this to instead collect photo with filename "header.jpg"
  // connect to s3, request all objects in specified prefix that end with jpg, select a random one

  // first, attempt to get the normal header image
  const prefix = `portfolio/${slug}/`

  const photoURL = `${bucketURL}${prefix}header.jpg`

  let photoInfo: ProbeResult

  try {
    // try to get the photo info
    photoInfo = await probe(photoURL)
  } catch (error) {
    // if something goes wrong, do fallback of randomly selecting an image
    const photos = await getPhotosFromPortfolio(slug)

    // randomly select a photo
    let index = Math.floor(Math.random() * photos.length)

    // get image
    let img = photos[index]

    // for now, for simplicity on CSS, only allow landscape orientation
    while (img.height > img.width) {
      index = Math.floor(Math.random() * photos.length)
      img = photos[index]
    }

    const headerImage: Photo = {
      url: img.url,
      width: img.width,
      height: img.height,
    }
    return headerImage
  }

  // return collected image
  return {
    url: photoURL,
    width: photoInfo.width,
    height: photoInfo.height,
  }
}

/**
 * collects all portfolios, from s3 bucket
 */
export const getAllPortfolios = async (): Promise<PortfolioThumbnail[]> => {
  // call getPortfolioSlugs
  const slugs = await getPortfolioSlugs()

  // build portfolios
  const portfolios: PortfolioThumbnail[] = await Promise.all(
    // map each slug
    slugs.map(async (slug) => {
      // get header image
      const img = await getPortfolioHeaderImage(slug)

      // get information about portfolio
      const portfolioInfo = await getPortfolioInformation(slug)

      // build portfolio
      const portfolio: PortfolioThumbnail = {
        slug: slug,
        title: portfolioInfo.title,
        headerImage: img,
        description: portfolioInfo.description,
      }

      // return portfolio
      return portfolio
    })
  )

  // return portfolios
  return portfolios
}

/**
 * get all portfolio information from local json files
 * @param slug the name of the portfolio
 */
export const getPortfolioInformation = async (
  slug: string
): Promise<JSONPortfolioInfo> => {
  // get local path of file
  const path = join(portfolioDirec, `${slug}.json`)

  let contents = ''

  // attempt to get contents, if none can be found, return unknown
  try {
    contents = fs.readFileSync(path, 'utf8')
  } catch (e) {
    return {
      title: 'Unknown',
      description: 'unknown',
    }
  }

  // parse the json info
  const data = JSON.parse(contents)

  // return the info
  return {
    title: data.title,
    description: data.description,
  }
}
