import { StockType } from '@/types/stock/stock'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { Text, View } from 'react-native'

type PropsType = {
  stock: StockType
}

const NewsSection = ({ stock }: PropsType) => {
  const [newsList, setNewsList] = useState<any[]>([])

  // HTML 태그와 HTML 엔티티를 제거하는 함수
  const removeHtmlAndEntities = (text: string) => {
    return text
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ') // 연속된 공백 제거
      .trim()
  }

  useFocusEffect(
    useCallback(() => {
      const fetchNewsData = async () => {
        try {
          // 뉴스 검색
          const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
            params: {
              query: `${stock.name}`, // 더 구체적인 검색어
              display: 10,
              start: 1,
              sort: 'sim', // 최신순으로 정렬
              pd: 1, // 1일 이내의 뉴스만
            },
            headers: {
              'X-Naver-Client-Id': '1xP6LqDqGZ0x6Wl0vD57',
              'X-Naver-Client-Secret': 'I6QtbZtIKF',
            },
          })

          // console.log('뉴스 데이터:', JSON.stringify(response.data, null, 2));

          // 각 뉴스 항목에 대해 본문 페이지를 가져와서 og:image 추출
          const newsWithThumbnails = await Promise.all(
            response.data.items.map(async (item: any) => {
              try {

                const originalLink = item.originallink || item.link
                const pageResponse = await axios.get(originalLink)

                const mainContent =
                  pageResponse.data.match(/<article[^>]*>(.*?)<\/article>/s)?.[1] ||
                  pageResponse.data.match(
                    /<div[^>]*class="[^"]*article[^"]*"[^>]*>(.*?)<\/div>/s
                  )?.[1] ||
                  ''

                const articleText = mainContent
                  .replace(/<script[^>]*>.*?<\/script>/gs, '') // 스크립트 제거
                  .replace(/<style[^>]*>.*?<\/style>/gs, '') // 스타일 제거
                  .replace(/<[^>]+>/g, ' ') // HTML 태그 제거
                  .replace(/\s+/g, ' ') // 공백 정리
                  .trim()

                console.log('articleText', articleText)

                const ogImageMatch = pageResponse.data.match(
                  /<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i
                )
                const thumbnail = ogImageMatch ? ogImageMatch[1] : null
                return {
                  ...item,
                  thumbnail,
                  title: removeHtmlAndEntities(item.title),
                  description: removeHtmlAndEntities(item.description),
                }
              } catch (error) {
                console.error('썸네일 추출 실패:', error)
                return { ...item, thumbnail: null }
              }
            })
          )

          setNewsList(newsWithThumbnails)
          console.log('썸네일이 포함된 뉴스 데이터:', JSON.stringify(newsWithThumbnails, null, 2))
        } catch (error) {
          console.error('뉴스 데이터 조회 실패:', error)
        }
      }
      fetchNewsData()
    }, [])
  )

  return (
    <View>
      <Text>NewsSection</Text>
    </View>
  )
}

export default NewsSection
