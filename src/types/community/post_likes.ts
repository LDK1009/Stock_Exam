type PostLikeType = {
  id: number
  postId: number
  userId: string
  createdAt: string
}

type PostLikeCreateType = {
  postId: number
  userId: string
}

type PostLikeReadType = {
  postId: number
  userId: string
}

type PostLikeDeleteType = {
  postId: number
  userId: string
}

export type { PostLikeCreateType, PostLikeDeleteType, PostLikeReadType, PostLikeType }

