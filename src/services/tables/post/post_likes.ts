import { supabase } from '@/lib/supabaseClient'
import {
    PostLikeCreateType,
    PostLikeDeleteType,
    PostLikeReadType,
} from '@/types/community/post_likes'
import { decrementPostLikeCount, incrementPostLikeCount } from './post_stats'

////////// 게시물 좋아요 생성
async function createUserPostLike({ postId, userId }: PostLikeCreateType) {
  try {
    // 게시물 좋아요 생성
    const response = await supabase.from('post_likes').insert({ postId, userId }).select()
    // 게시물 좋아요 수 증가
    await incrementPostLikeCount(postId)

    return response
  } catch (error) {
    throw error
  }
}

////////// 게시물 좋아요 조회
async function getUserPostLikes({ postId, userId }: PostLikeReadType) {
  try {
    const response = await supabase
      .from('post_likes')
      .select('*')
      .eq('postId', postId)
      .eq('userId', userId)
      
    return response
  } catch (error) {
    throw error
  }
}

////////// 게시물 좋아요 삭제
async function deleteUserPostLike({ postId, userId }: PostLikeDeleteType) {
  try {
    // 게시물 좋아요 삭제
    const response = await supabase
      .from('post_likes')
      .delete()
      .eq('postId', postId)
      .eq('userId', userId)
      .select()
    // 게시물 좋아요 수 감소
    await decrementPostLikeCount(postId)

    return response
  } catch (error) {
    throw error
  }
}

export { createUserPostLike, deleteUserPostLike, getUserPostLikes }

