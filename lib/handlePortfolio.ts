/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PortfolioInfo,
  Photo,
  PortfolioThumbnail,
  MarkdownPortfolioInfo,
} from '../types/types'
import { s3Client, bucketRegion, bucketName } from './s3Client'
import {
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3'
import probe from 'probe-image-size'
import matter from 'gray-matter'

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
    slug: portfolioInfo.description,
    photos: photos,
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
  // TODO: this function seems to be extremely slow...

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
  const bucketURL =
    'https://' + bucketName + '.s3.' + bucketRegion + '.amazonaws.com/'

  // iterate starting with second object, first is just the prefix name
  let index = 1
  if (response.Contents) {
    while (index < response.Contents?.length) {
      // append tag
      const url = bucketURL + response.Contents[index].Key

      // dont read in markdown file, this will break things
      if (url.slice(-2) != 'md') {
        photoURLs.push(url)
      }
      index = index + 1
    }
  }

  // fetch the width and height using probe
  const images = await Promise.all(
    photoURLs.map(async (url) => {
      const photoInfo = await probe(url)

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
  // connect to s3, request all objects in specified prefix that end with jpg, select a random one
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

const streamToString = async (stream: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: any = []
    stream.on('data', (chunk: any) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })

/**
 * get all portfolio information
 * @param slug the name of the portfolio
 */
export const getPortfolioInformation = async (
  slug: string
): Promise<MarkdownPortfolioInfo> => {
  const key = 'portfolio/' + slug + '/' + slug + '.md'

  // query s3 for data
  const params: GetObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
  }

  const command = new GetObjectCommand(params)
  const response = await s3Client.send(command)

  if (response.Body) {
    const res: string = await streamToString(response.Body)
    const { data } = matter(res)

    const info: MarkdownPortfolioInfo = {
      title: data.title,
      description: data.description,
    }

    return info
  }

  return {
    title: 'None',
    description: 'None',
  }
}
