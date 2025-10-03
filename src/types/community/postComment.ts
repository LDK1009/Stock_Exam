type PostCommentType = {
  id?: number
  postId: number
  parentId?: number | null
  userId: string
  content: string
  createdAt?: string
  updatedAt?: string

  users?: {
    nickname: string
  }
}

type PostCommentListType = PostCommentType[]

export type { PostCommentListType, PostCommentType }

