type CommunityCategoryType =
  | '자유게시판'
  | '종목토론'
  | '라고할때살걸'
  | '주린이'
  | '마인드컨트롤'
  | '투자자문'

type Post = {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  views: number
  comments: number
  likes: number
}

type PostList = Post[]

export type { CommunityCategoryType, Post, PostList }

