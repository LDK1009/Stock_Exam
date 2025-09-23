import { PostListType } from '@/types/community/community'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  postList: PostListType
  setPostList: (value: PostListType) => void
}

const samplePostList: PostListType = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  category: null,
  title: 'ETF와 개별주식, 어디에 투자하는 게 나을까요? 너무너무 고민입니다 ㅜㅜ 제발 정답을 알려주세요 흐흐흑',
  content:
    'ETF 컨텐츠 내용....ETF 컨텐츠 내용....ETF 컨텐츠 내용....ETF 컨텐츠 내용....ETF 컨텐츠 내용....ETF 컨텐츠 내용....ETF 컨텐츠 내용....',
  authorUid: '배고픈 하마',
  createdAt: '2025-01-01',
  viewCount: 100,
  commentCount: 100,
  recommendationCount: 100,
}))

export const usePostStore = create<StoreType>((set) => ({
  // 카테고리 초기값
  postList: samplePostList,
  setPostList: (value) => set({ postList: value }),
}))
