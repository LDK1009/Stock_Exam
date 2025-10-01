import { cleanHtmlContent, removeHtmlAndEntities } from '@/utils/html'
import axios from 'axios'

type getNaverNewsParams = {
  searchString: string
  count?: number
  start?: number
  sort?: 'sim' | 'date'
}

async function getNaverNews({
  searchString,
  count = 10,
  start = 1,
  sort = 'sim',
}: getNaverNewsParams) {
  const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
    params: {
      query: `${searchString}`, // 더 구체적인 검색어
      display: count,
      start: start,
      sort: sort,
    },
    headers: {
      'X-Naver-Client-Id': `${process.env.EXPO_PUBLIC_NAVER_CLIENT_ID}`,
      'X-Naver-Client-Secret': `${process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET}`,
    },
  })

  return response.data.items
}

async function getStockNewsList(stockName: string) {
  const searchKeywords = [
    '주가',
    '실적',
    '전망',
    '분석',
    '리포트',
    '공시',
    'IR',
    '배당',
    '투자의견',
    '목표가',
  ]

  // const keywordNewsPromise = searchKeywords.map(async (keyword) => {
  //   const keywordNews = await getNaverNews({ searchString: `${searchString} ${keyword}`, count:1 })
  //   return keywordNews[0]
  // })

  // const keywordNews = await Promise.all(keywordNewsPromise)

  //////////////////////////////////////////////////////////////

  const searchString = `"${stockName}" ${searchKeywords.join(' | ')}`

  // 네이버 뉴스 검색
  const response = await getNaverNews({ searchString: searchString, count: 100 })

  // 네이버 뉴스 링크만 필터링
  const naverNewsOnly = response.filter((item: any) =>
    item.link.startsWith('https://n.news.naver.com/')
  )

  // 썸네일 추가 및 본문 추출
  const stockNewsList = await Promise.all(
    naverNewsOnly.map(async (item: any) => {
      try {
        // 기사 HTML 가져오기
        const pageHtml = await axios.get(item.link)

        // 썸네일 추출
        const ogImageMatch = pageHtml.data.match(
          /<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i
        )

        const thumbnail = ogImageMatch ? ogImageMatch[1] : null

        // 네이버 뉴스 본문 추출 (dic_area 클래스를 가진 article 태그)
        const mainContent =
          pageHtml.data.match(
            /<article[^>]*class="[^"]*go_trans[^"]*"[^>]*>(.*?)<\/article>/s
          )?.[1] || ''

        // 특수문자 제거
        const articleText = cleanHtmlContent(mainContent)

        return {
          ...item,
          thumbnail,
          title: removeHtmlAndEntities(item.title),
          description: removeHtmlAndEntities(item.description),
          content: removeHtmlAndEntities(articleText),
        }
      } catch (error) {
        console.error('썸네일 추가 및 본문 추출 실패:', error)
        return { ...item, thumbnail: '' }
      }
    })
  )

  return stockNewsList
}

export { getStockNewsList }

