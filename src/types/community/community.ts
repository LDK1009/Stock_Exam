type CommunityCategoryType =
  | '자유게시판'
  | '종목토론'
  | '라고할때살걸'
  | '주린이'
  | '마인드컨트롤'
  | '투자자문'

type PostType = {
  id?: number
  category: CommunityCategoryType | null
  title: string
  content: string
  userId?: string
  createdAt?: string
  updatedAt?: string

  ///// 테이블 조인
  // users 테이블 조인
  users?: {
    nickname?: string
  }
  // post_stats 테이블 조인
  post_stats?: {
    viewCount?: number
    likeCount?: number
    commentCount?: number
  }
}

type PostListType = PostType[]

export type { CommunityCategoryType, PostListType, PostType }

