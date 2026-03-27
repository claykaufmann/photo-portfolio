import {
  PortfolioInfo,
  Photo,
  PortfolioThumbnail,
  JSONPortfolioInfo,
} from '@/types/types'
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
  const params: ListObjectsV2CommandInput = {
    Bucket: bucketName,
    Prefix: 'portfolio/',
    Delimiter: '/',
  }

  const command = new ListObjectsV2Command(params)
  const response = await s3Client.send(command)

  const slugs: string[] = []

  response.CommonPrefixes?.map((prefix) => {
    if (prefix.Prefix) {
      const filteredPrefix = prefix.Prefix.slice(10, -1)
      slugs.push(filteredPrefix)
    }
  })

  return slugs
}

export const getPortfolioBySlug = async (
  slug: string
): Promise<PortfolioInfo> => {
  const photos = await getPhotosFromPortfolio(slug)
  const portfolioInfo = await getPortfolioInformation(slug)

  return {
    title: portfolioInfo.title,
    slug: slug,
    photos: photos,
    description: portfolioInfo.description,
  }
}

export const getPhotosFromPortfolio = async (
  slug: string
): Promise<Photo[]> => {
  const prefix = 'portfolio/' + slug + '/'
  const params: ListObjectsV2CommandInput = {
    Bucket: bucketName,
    Prefix: prefix,
  }

  const command = new ListObjectsV2Command(params)
  const response: ListObjectsV2CommandOutput = await s3Client.send(command)

  const photoURLs = []

  let index = 1
  if (response.Contents) {
    while (index < response.Contents?.length) {
      const url = bucketURL + response.Contents[index].Key

      if (url.slice(-3) == 'jpg' && url.slice(-10) != 'header.jpg') {
        photoURLs.push(url)
      }
      index = index + 1
    }
  }

  const images = await Promise.all(
    photoURLs.map(async (url) => {
      const photoInfo = await probe(url)

      // Derive alt text from filename (e.g. "my-photo.jpg" → "my photo")
      const filename = url.split('/').pop()?.replace(/\.[^.]+$/, '') ?? ''
      const alt = filename.replace(/[-_]/g, ' ')

      const newImage: Photo = {
        url: url,
        width: photoInfo.width,
        height: photoInfo.height,
        alt,
      }

      return newImage
    })
  )

  return images
}

export const getPortfolioHeaderImage = async (slug: string): Promise<Photo> => {
  const prefix = `portfolio/${slug}/`
  const photoURL = `${bucketURL}${prefix}header.jpg`

  let photoInfo: ProbeResult

  try {
    photoInfo = await probe(photoURL)
  } catch (error) {
    const photos = await getPhotosFromPortfolio(slug)

    let index = Math.floor(Math.random() * photos.length)
    let img = photos[index]

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

  return {
    url: photoURL,
    width: photoInfo.width,
    height: photoInfo.height,
  }
}

export const getAllPortfolios = async (): Promise<PortfolioThumbnail[]> => {
  const slugs = await getPortfolioSlugs()

  const portfolios: PortfolioThumbnail[] = await Promise.all(
    slugs.map(async (slug) => {
      const img = await getPortfolioHeaderImage(slug)
      const portfolioInfo = await getPortfolioInformation(slug)

      const portfolio: PortfolioThumbnail = {
        slug: slug,
        title: portfolioInfo.title,
        headerImage: img,
        description: portfolioInfo.description,
      }

      return portfolio
    })
  )

  for (let i = 0; i < portfolios.length; i++) {
    if (portfolios[i].title === 'Main') {
      const temp = portfolios[0]
      portfolios[0] = portfolios[i]
      portfolios[i] = temp
    }
  }

  return portfolios
}

export const getPortfolioInformation = async (
  slug: string
): Promise<JSONPortfolioInfo> => {
  const path = join(portfolioDirec, `${slug}.json`)

  let contents = ''

  try {
    contents = fs.readFileSync(path, 'utf8')
  } catch (e) {
    return {
      title: 'Unknown',
      description: 'unknown',
    }
  }

  const data = JSON.parse(contents)

  return {
    title: data.title,
    description: data.description,
  }
}
