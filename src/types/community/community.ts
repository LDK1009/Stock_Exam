type CommunityCategoryType =
  | '자유게시판'
  | '종목토론'
  | '라고할때살걸'
  | '주린이'
  | '마인드컨트롤'
  | '투자자문'

type PostType = {
  id?: string
  category: CommunityCategoryType | null
  title: string
  content: string
  userId?: string
  createdAt?: string
  updatedAt?: string
  viewCount?: number
  commentCount?: number
  recommendationCount?: number
}

type PostListType = PostType[]

export type { CommunityCategoryType, PostListType, PostType }

