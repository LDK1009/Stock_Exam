import { supabase } from '@/lib/supabaseClient'
import { useQuizStore } from '@/stores/quiz'
import { mixinContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import Quiz from './components/Quiz'

const QuizScreen = () => {
  ////////// 상태 관리
  const { quizList, setQuizzes } = useQuizStore()
  const [loading, setLoading] = useState(false) // 로딩 상태
  const [canMore, setCanMore] = useState(true) // 더 불러올 데이터가 있는지
  const [page, setPage] = useState(0) // 현재 페이지 번호

  ////////// 퀴즈 데이터 가져오기
  async function getQuiz(pageNumber = 0) {
    // 더 이상 불러올 데이터가 없거나 이미 로딩 중이면 중단
    if (!canMore || loading) return

    // 로딩 상태 설정
    setLoading(true)

    // 퀴즈 데이터 가져오기
    try {
      // 퀴즈 데이터 가져오기
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('createdAt', { ascending: false }) // 최신순 정렬
        .range(pageNumber * 10, (pageNumber + 1) * 10 - 1) // 10개씩 페이지네이션

      // 에러 처리
      if (error) throw error

      // 10개 미만이 오면 마지막 페이지
      if (data.length < 10) {
        setCanMore(false)
      }

      // 첫 페이지면 교체, 아니면 기존 데이터에 추가
      if (pageNumber === 0) {
        setQuizzes(data || [])
      } else {
        setQuizzes([...quizList, ...(data || [])])
      }
    } catch (error) {
      // 에러 처리
      console.error('퀴즈 로드 실패:', error)
    } finally {
      // 로딩 상태 초기화
      setLoading(false)
    }
  }

  ////////// 무한 스크롤
  const loadMore = () => {
    // 로딩 중이거나 더 불러올 데이터가 없으면 중단
    if (!loading && canMore) {
      const nextPage = page + 1
      setPage(nextPage)
      getQuiz(nextPage)
    }
  }

  ////////// 마운트 시 초기화
  useEffect(() => {
    setPage(0) // 페이지 초기화
    setCanMore(true) // 더 불러오기 가능하도록 초기화
    getQuiz(0) // 첫 페이지 로드
  }, [])

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
    <Container>
      <FlatList
        data={quizList}
        renderItem={({ item }) => <Quiz quiz={item} />}
        keyExtractor={(item) => item.id?.toString() || ''}
        contentContainerStyle={{ gap: 16 }}
        onEndReached={loadMore} // 하단 도달시 추가 로드
        onEndReachedThreshold={0.5} // 하단 50% 지점에서 트리거
        ListFooterComponent={renderFooter} // 하단 로딩 인디케이터
      />
    </Container>
  )
}

export default QuizScreen

////////// 스타일링
const Container = styled(SafeAreaView)`
  ${mixinContainer}
  ${mixinFlex('column', 'flex-start', 'center')}
  background-color: ${theme.colors.background.default};
`

const LoadingContainer = styled.View`
  padding: 20px;
  align-items: center;
`
