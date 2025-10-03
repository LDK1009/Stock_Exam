import { supabase } from '@/lib/supabaseClient'
import { PostCommentCreateType, PostCommentUpdateType } from '@/types/community/post_comments'
import { decrementPostCommentCount, incrementPostCommentCount } from './post_stats'

////////// 게시물 댓글 생성
async function createPostComment(params: PostCommentCreateType) {
  try {
    // 게시물 댓글 데이터
    const { postId } = params
    // 게시물 댓글 생성
    const { data, error } = await supabase.from('post_comments').insert(params).select()

    // 게시물 댓글 수 증가
    await incrementPostCommentCount(postId)

    return { data, error }
  } catch (error) {
    throw error
  }
}

////////// 게시물 댓글 조회
async function getPostComments(postId: number) {
  try {
    const { data, error } = await supabase
      .from('post_comments')
      .select(`*, users(nickname)`)
      .eq('postId', postId)

    return { data, error }
  } catch (error) {
    throw error
  }
}

////////// 게시물 댓글 수정
async function updatePostComment(postCommentId: number, postCommentData: PostCommentUpdateType) {
  try {
    const { data, error } = await supabase
      .from('post_comments')
      .update(postCommentData)
      .eq('id', postCommentId)

    return { data, error }
  } catch (error) {
    throw error
  }
}

////////// 게시물 댓글 삭제
async function deletePostComment(postCommentId: number) {
  try {
    // 게시물 댓글 삭제
    const { data, error } = await supabase.from('post_comments').delete().eq('id', postCommentId)
    // 게시물 댓글 수 감소
    await decrementPostCommentCount(postCommentId)

    return { data, error }
  } catch (error) {
    throw error
  }
}

export { createPostComment, deletePostComment, getPostComments, updatePostComment }

