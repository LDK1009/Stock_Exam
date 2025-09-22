import { supabase } from '@/lib/supabaseClient'
import { QuizListType } from '@/types/quiz/quiz'
import { create } from 'zustand'

// 상태 타입
type StoreType = {
  quizList: QuizListType
  loading: boolean
  canMore: boolean
  page: number
  setQuizList: (quizzes: QuizListType) => void
  setLoading: (loading: boolean) => void
  setCanMore: (canMore: boolean) => void
  setPage: (page: number) => void
  getQuiz: (
    pageNumber?: number,
    searchValue?: string,
    category?: string,
    difficulty?: number | null,
    type?: string,
    sort?: string
  ) => Promise<void>
}

export const useQuizStore = create<StoreType>((set, get) => ({
  quizList: [],
  loading: false,
  canMore: true,
  page: 0,
  setQuizList: (quizzes) => set({ quizList: quizzes }),
  setLoading: (loading) => set({ loading }),
  setCanMore: (canMore) => set({ canMore }),
  setPage: (page) => set({ page }),
  getQuiz: async (
    pageNumber = 0,
    searchValue = '',
    category = '',
    difficulty: null | number = null,
    type = '',
    sort = ''
  ) => {
    const { loading, canMore, quizList } = get()

    // 페이지가 0이면 새로운 검색 시작
    if (pageNumber === 0) {
      set({ canMore: true })
    }
    // 페이지가 0이 아닐 때만 canMore 체크
    else if (!canMore || loading) {
      return
    }

    // 로딩 상태 설정
    set({ loading: true })

    try {
      // 기본 쿼리 설정
      let query = supabase.from('quizzes').select('*')

      // 검색어 필터
      if (searchValue) {
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
      if (category && category !== '전체') {
        query = query.eq('category', category)
      }

      // 난이도 필터
      if (difficulty !== null) {
        query = query.eq('difficulty', difficulty)
      }

      // 문제 유형 필터
      if (type && type !== '전체') {
        query = query.eq('type', type)
      }

      // 정렬 필터
      if (sort) {
        const sortMap = {
          인기순: 'quizViews(view):desc',
          최신순: 'createdAt:desc:',
          오래된순: 'createdAt:asc',
          난이도순: 'difficulty:asc',
          난이도역순: 'difficulty:desc',
        }

        const sortColumn = sortMap[sort as keyof typeof sortMap].split(':')[0]
        const sortDirection = sortMap[sort as keyof typeof sortMap].split(':')[1]

        if (sort !== '인기순') {
          query = query.order(sortColumn, { ascending: sortDirection === 'asc' })
        }
      }

      // 페이지네이션 적용
      const { data, error } = await query.range(pageNumber * 10, (pageNumber + 1) * 10 - 1)

      // 에러 처리
      if (error) throw error

      // 10개 미만이 오면 마지막 페이지
      if (data.length < 10) {
        set({ canMore: false })
      }

      // 첫 페이지면 교체, 아니면 기존 데이터에 추가
      if (pageNumber === 0) {
        set({ quizList: data || [] })
      } else {
        // 중복 제거하여 병합
        const uniqueQuizzes = [...quizList, ...(data || [])].filter(
          (quiz, index, self) => index === self.findIndex((q) => q.id === quiz.id)
        )
        set({ quizList: uniqueQuizzes })
      }
    } catch (error) {
      console.error('퀴즈 로드 실패:', error)
    } finally {
      set({ loading: false })
    }
  },
}))
