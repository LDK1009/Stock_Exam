import { useQuizFilterStore } from '@/stores/screens/quiz/filter'
import { useQuizStore } from '@/stores/screens/quiz/quiz'
import { useActionBarStore } from '@/stores/screens/quiz/ui/actionBar'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import Quiz from './Quiz'

const QuizList = () => {
  ////////// 상태 관리
  const { quizList, loading, canMore, page, setPage, getQuiz } = useQuizStore()
  const { fetchUserLikedList } = useActionBarStore()
  const { searchValue, category, difficulty, type, sort } = useQuizFilterStore()

  ////////// 무한 스크롤
  const loadMore = () => {
    // 로딩 중이거나 더 불러올 데이터가 없으면 중단
    if (!loading && canMore) {
      const nextPage = page + 1
      setPage(nextPage)
      getQuiz(nextPage, searchValue, category, difficulty, type, sort)
    }
  }

  ////////// 필터 변경 시 데이터 다시 불러오기
  useEffect(() => {
    setPage(0) // 페이지 초기화
    getQuiz(0, searchValue, category, difficulty, type, sort) // 필터 적용하여 데이터 로드
    fetchUserLikedList()
  }, [searchValue, category, difficulty, type, sort])

  ////////// 로딩 인디케이터 컴포넌트
  const renderFooter = () => {
    if (!loading) return null

    return (
      <LoadingContainer>
        <ActivityIndicator size='large' color={theme.colors.core.white} animating={true} />
      </LoadingContainer>
    )
  }

  return (
    <FlatList
      data={quizList}
      renderItem={({ item, index }) => <Quiz quiz={item} index={index} />}
      keyExtractor={(item, index) => item.id?.toString() || `no-id-${index}`}
      contentContainerStyle={{ gap: 16 }}
      onEndReached={loadMore} // 하단 도달시 추가 로드
      onEndReachedThreshold={0.5} // 하단 50% 지점에서 트리거
      ListFooterComponent={renderFooter} // 하단 로딩 인디케이터
    />
  )
}

export default QuizList

////////// 스타일링
const LoadingContainer = styled.View`
  padding: 20px;
  align-items: center;
`
