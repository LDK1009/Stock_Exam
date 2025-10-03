////////// 게시물 댓글 타입
type PostCommentType = {
  id: number
  postId: number
  parentId?: number | null
  userId: string
  content: string
  createdAt: string
  updatedAt?: string
}

////////// 게시물 댓글 생성 타입
type PostCommentCreateType = {
  postId: number
  parentId?: number | null
  userId: string
  content: string
}

////////// 게시물 댓글 조회 타입
type PostCommentReadType = {
  postId: number
}

////////// 게시물 댓글 수정 타입
type PostCommentUpdateType = {
  postId: number
  parentId?: number | null
  userId: string
  content: string
}

////////// 게시물 댓글 삭제 타입
type PostCommentDeleteType = {
  postId: number
  userId: string
}

export type {
  PostCommentCreateType,
  PostCommentDeleteType,
  PostCommentReadType,
  PostCommentType,
  PostCommentUpdateType
}

