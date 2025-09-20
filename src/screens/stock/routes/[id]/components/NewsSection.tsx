import { getNaverNews } from '@/services/api/naver/news'
import { NewsType } from '@/types/news/news'
import { StockType } from '@/types/stock/stock'
import styled from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import NewsItem from './NewsItem'

type PropsType = {
  stock: StockType
}

const NewsSection = ({ stock }: PropsType) => {
  const [newsList, setNewsList] = useState<NewsType[]>([])

  const QuizWidth = 300
  const QuizGap = 16
  const TotalWidth = QuizWidth * newsList.length + QuizGap * (newsList.length - 1)

  type RenderItemProps = {
    item: NewsType
    index: number
  }

  const renderItem = useCallback(
    ({ item: newsData }: RenderItemProps) => <NewsItem news={newsData} />,
    [TotalWidth]
  )

  useFocusEffect(
    useCallback(() => {
      const fetchNewsData = async () => {
        try {
          // 뉴스 검색
          const response = await getNaverNews(stock.name)

          setNewsList(response)
        } catch (error) {
          console.error('뉴스 데이터 조회 실패:', error)
        }
      }
      fetchNewsData()
    }, [])
  )

  return (
    <FlatListContainer>
      <FlatList
        ///// 렌더링 관련
        // 렌더링할 배열
        data={newsList}
        horizontal
        // 렌더링할 아이템 컴포넌트
        renderItem={renderItem}
        ///// 페이징 관련
        snapToInterval={316} // 316px 단위로 스냅
        snapToAlignment='start'
        decelerationRate='fast'
        ///// 뷰 트래킹 관련
        ///// 성능 최적화 관련
        removeClippedSubviews={true} // 화면 밖 아이템 메모리에서 제거
        maxToRenderPerBatch={3} // 한번에 렌더링할 아이템 수 제한
        ///// 기타
        // 스크롤바 숨김 여부
        showsVerticalScrollIndicator={false} // 스크롤바 숨기기
        // 컨텐츠 컨테이너 스타일
        contentContainerStyle={{ gap: 16 }}
      />
    </FlatListContainer>
  )
}

export default NewsSection

const FlatListContainer = styled(View)`
  height: 450px;
`
