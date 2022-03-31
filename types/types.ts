export interface PortfolioInfo {
  slug: string
  title: string
  photos: Photo[]
  description?: string
}

export interface PortfolioThumbnail {
  slug: string
  title: string
  headerImage: Photo
  description: string
}

export interface Photo {
  url: string
  width: number
  height: number
  alt?: string
}

export interface MarkdownPortfolioInfo {
  title: string
  description: string
}
