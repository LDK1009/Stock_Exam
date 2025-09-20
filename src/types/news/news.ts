type NewsType = {
  title: string
  originallink: string
  link: string
  description: string
  pubDate: string
  thumbnail: string
  content: string
}

type NewsListType = NewsType[]

export type { NewsListType, NewsType }

