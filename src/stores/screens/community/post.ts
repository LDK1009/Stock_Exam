import { supabase } from '@/lib/supabaseClient'
import { PostListType } from '@/types/community/community'
import { create } from 'zustand'

// 상태 타입
type StoreType = {
  postList: PostListType
  loading: boolean
  canMore: boolean
  page: number
  setPostList: (posts: PostListType) => void
  setLoading: (loading: boolean) => void
  setCanMore: (canMore: boolean) => void
  setPage: (page: number) => void
  getPosts: (
    pageNumber?: number,
    category?: string | null
  ) => Promise<void>
}

export const usePostStore = create<StoreType>((set, get) => ({
  postList: [],
  loading: false,
  canMore: true,
  page: 0,
  setPostList: (posts) => set({ postList: posts }),
  setLoading: (loading) => set({ loading }),
  setCanMore: (canMore) => set({ canMore }),
  setPage: (page) => set({ page }),
  getPosts: async (pageNumber = 0, category = null) => {
    const { loading, canMore, postList } = get()

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
      let query = supabase.from('posts').select('*')

      // 카테고리 필터
      if (category) {
        query = query.eq('category', category)
      }

      // 최신순 정렬
      query = query.order('createdAt', { ascending: false })

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
        set({ postList: data || [] })
      } else {
        // 중복 제거하여 병합
        const uniquePosts = [...postList, ...(data || [])].filter(
          (post, index, self) => index === self.findIndex((p) => p.id === post.id)
        )
        set({ postList: uniquePosts })
      }
    } catch (error) {
      console.error('게시글 로드 실패:', error)
    } finally {
      set({ loading: false })
    }
  },
}))
