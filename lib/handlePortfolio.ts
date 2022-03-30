import { PortfolioInfo, Photo, PortfolioThumbnail } from '../types/types'
import { s3Client, bucketName, bucketRegion } from './s3Client'
import {
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3'
import probe from 'probe-image-size'

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
  const response: ListObjectsV2CommandOutput = await s3Client.send(command)

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
  // instantiate portfolioInfo object
  // add written information about portfolio
  // return the portfolioInfo object
  return {
    title: slug,
    slug: slug,
    photos: photos,
  }
}

/**
 * collects all photos from a specified prefix
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
  const bucketURL =
    'https://' + bucketName + '.s3.' + bucketRegion + '.amazonaws.com/'

  // iterate starting with second object, first is just the prefix name
  let index = 1
  if (response.Contents) {
    while (index < response.Contents?.length) {
      // append tag
      const url = bucketURL + response.Contents[index].Key
      photoURLs.push(url)
      index = index + 1
    }
  }
  console.log(photoURLs)

  // fetch the width and height using probe
  const images = await Promise.all(
    photoURLs.map(async (url) => {
      console.log('probing')
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
 * returns the header image for each portfolio
 * @param slug a prefix name for an s3 bucket
 */
export const getPortfolioHeaderImage = (slug: string): Photo => {
  // we will save header images as header.jpg, collect that file, get necessary info, return it
}

/**
 * collects all portfolios, from s3 bucket
 */
export const getAllPortfolios = async (): PortfolioThumbnail[] => {
  // call getPortfolioSlugs
  const slugs = getPortfolioSlugs()
  console.log(slugs)
  // get respective header images from each slug (can be a special name)

  // return all slugs
}

export const testS3 = async (slug: string) => {
  const prefix = 'portfolio/' + slug + '/'
  const params: ListObjectsV2CommandInput = {
    Bucket: bucketName,
    Prefix: prefix,
  }

  // make command
  const command = new ListObjectsV2Command(params)

  // send command
  const response: ListObjectsV2CommandOutput = await s3Client.send(command)

  console.log(response)
}
