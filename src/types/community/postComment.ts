type PostCommentType = {
  id?: string
  postId: string
  parentId?: string | null
  authorUid: string
  content: string
  createdAt?: string
  updatedAt?: string
}

type PostCommentListType = PostCommentType[]

export type { PostCommentListType, PostCommentType }

