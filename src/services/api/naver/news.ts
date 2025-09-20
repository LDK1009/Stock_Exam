import { cleanHtmlContent, removeHtmlAndEntities } from '@/utils/html'
import axios from 'axios'
import { chatGPT } from '../openai/gpt'

async function getNaverNews(searchString: string) {
  // 네이버 뉴스 검색
  const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
    params: {
      query: `${searchString}`, // 더 구체적인 검색어
      display: 100,
      start: 1,
      sort: 'sim',
      pd: 1, // 1일 이내의 뉴스만
    },
    headers: {
      'X-Naver-Client-Id': `${process.env.EXPO_PUBLIC_NAVER_CLIENT_ID}`,
      'X-Naver-Client-Secret': `${process.env.EXPO_PUBLIC_NAVER_CLIENT_SECRET}`,
    },
  })

  // 네이버 뉴스 링크만 필터링
  const naverNewsOnly = response.data.items.filter((item: any) =>
    item.link.startsWith('https://n.news.naver.com/')
  )

  
  const onlyTitle = naverNewsOnly.map((item: any) => item.title)
  console.log('onlyTitle', JSON.stringify(onlyTitle, null, 2), onlyTitle.length)

  const filterdSimilarity = await chatGPT(
    '주어진 기사 배열에서 `title` 값을 기준으로 유사도가 높은 중복 기사들을 모두 제거하고, 고유한 기사만 남은 배열을 반환해줘.  - 중복 판정 기준: 제목 유사도 30% 이상  - 여러 중복이 있으면 가장 앞(인덱스가 작은) 기사만 남기고 나머지는 제거 - 최종 결과는 중복이 제거된 고유 기사들의 객체 배열로만 반환 답변은 필수로 JSON 형식으로 반환해줘',
    `${onlyTitle}`,
    '[{title : string, index : number},{title : string, index : number}...]'
  )

  console.log('filterdSimilarity', JSON.stringify(filterdSimilarity, null, 2))

  // 썸네일 추가 및 본문 추출
  const returnData = await Promise.all(
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

  return returnData
}

export { getNaverNews }

