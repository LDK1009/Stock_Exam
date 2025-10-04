////////// 커뮤니티 카테고리 타입
type CommunityCategoryType =
  | '자유게시판'
  | '종목토론'
  | '라고할때살걸'
  | '주린이'
  | '마인드컨트롤'
  | '투자자문'

////////// 게시물 타입
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

////////// 게시물 목록 타입
type PostListType = PostType[]

////////// 이전/다음 게시물 목록 타입
type PreviousAndNextPostType = {
  id: number
  title: string
  post_stats: {
    viewCount: number
    likeCount: number
    commentCount: number
  }
}

type PreviousAndNextPostListType = (PreviousAndNextPostType | null)[]


export type { CommunityCategoryType, PostListType, PostType, PreviousAndNextPostListType, PreviousAndNextPostType }

