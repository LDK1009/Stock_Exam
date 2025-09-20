import CommonText from '@/components/display/CommonText'
import { getStockList } from '@/services/api/public-data-portal/stock'
import { useStockStore } from '@/stores/screens/stock/stock'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import StockList from './components/StockList'

const StockScreen = () => {
  const { stockList, setStockList } = useStockStore()

  async function fetchStockData() {
    const stockListData = await getStockList()
    // console.log('주식 데이터:', stockListData)
    setStockList(stockListData)
  }

  useFocusEffect(
    useCallback(() => {
      fetchStockData()
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      const fetchNewsData = async () => {
        try {
          // 뉴스 검색
          const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
            params: {
              query: '삼성전자 주식',  // 더 구체적인 검색어
              display: 10,
              start: 1,
              sort: 'sim',  // 최신순으로 정렬
              pd: 1,  // 1일 이내의 뉴스만
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

                const ogImageMatch = pageResponse.data.match(
                  /<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i
                )
                const thumbnail = ogImageMatch ? ogImageMatch[1] : null
                return { ...item, thumbnail }
              } catch (error) {
                console.error('썸네일 추출 실패:', error)
                return { ...item, thumbnail: null }
              }
            })
          )

          // console.log('썸네일이 포함된 뉴스 데이터:', JSON.stringify(newsWithThumbnails, null, 2))
        } catch (error) {
          console.error('뉴스 데이터 조회 실패:', error)
        }
      }
      fetchNewsData()
    }, [])
  )

  return (
    <Container>
      <CommonText>StockScreen</CommonText>
      <StockList stockList={stockList} />
    </Container>
  )
}

export default StockScreen

const Container = styled(View)`
  flex: 1;
  ${mixinFlex('column', 'flex-start', 'center')}
  padding: 32px 16px;
  padding-bottom: 0px;
  row-gap: 24px;
  background-color: ${theme.colors.background.default};
`
