import { supabase } from '@/lib/supabaseClient'
import { useQuizFilterStore } from '@/stores/screens/quiz/filter'
import { useQuizStore } from '@/stores/screens/quiz/quiz'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import Quiz from './Quiz'

const QuizList = () => {
  ////////// 상태 관리
  const { quizList, setQuizzes } = useQuizStore()
  const { searchValue, category, difficulty, type, orderBy } = useQuizFilterStore()
  const [loading, setLoading] = useState(false) // 로딩 상태
  const [canMore, setCanMore] = useState(true) // 더 불러올 데이터가 있는지
  const [page, setPage] = useState(0) // 현재 페이지 번호

  ////////// 퀴즈 데이터 가져오기
  async function getQuiz(
    pageNumber = 0,
    searchValue = '',
    category = '',
    difficulty = '',
    type = '',
    orderBy = 'createdAt'
  ) {
    // 페이지가 0이 아닐 때만 canMore 체크 (새로운 검색 시작할 때는 무시)
    if ((pageNumber > 0 && !canMore) || loading) {
      return
    }

    // 로딩 상태 설정
    setLoading(true)

    // 퀴즈 데이터 가져오기
    try {
      // 기본 쿼리 설정
      let query = supabase.from('quizzes').select('*')

      // 검색어 필터
      if (searchValue) {
        // 검색 조건 설정
        query = query.or(
          [
            `question.ilike.%${searchValue}%`,
            `explanation.ilike.%${searchValue}%`,
            `options.cs.{"${searchValue}"}`,
            `tags.cs.{"${searchValue}"}`,
          ].join(',')
        )
      }

      // 카테고리 필터
      if (category) {
        if (category !== '전체') {
          query = query.eq('category', category)
        }
      }

      // 난이도 필터
      if (difficulty) {
        query = query.eq('difficulty', difficulty)
      }

      // 문제 유형 필터
      if (type) {
        query = query.eq('type', type)
      }

      // 정렬 순서 설정
      const [orderByField, orderDirection] = orderBy.split(':') // 예) createdAt:desc
      query = query.order(orderByField, { ascending: orderDirection === 'asc' })

      // 페이지네이션 적용
      const { data, error } = await query.range(pageNumber * 10, (pageNumber + 1) * 10 - 1) // 10개씩 페이지네이션

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
      getQuiz(nextPage, searchValue, category, difficulty, type, orderBy)
    }
  }

  ////////// 필터 변경 시 데이터 다시 불러오기
  useEffect(() => {
    setPage(0) // 페이지 초기화
    setCanMore(true) // 더 불러오기 가능하도록 초기화
    getQuiz(0, searchValue, category, difficulty, type, orderBy) // 필터 적용하여 데이터 로드
  }, [searchValue, category, difficulty, type, orderBy])

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
      renderItem={({ item }) => <Quiz quiz={item} />}
      keyExtractor={(item) => item.id?.toString() || ''}
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
