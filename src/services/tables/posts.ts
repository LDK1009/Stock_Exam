import { supabase } from '@/lib/supabaseClient'
import { PostType } from '@/types/community/community'
import { createPostStats } from './post_stats'

async function createPost(postData: PostType) {
  try {
    const response = await supabase.from('posts').insert(postData).select()

    // 포스트 스탯 생성
    if (response.data) {
      await createPostStats(response.data[0].id)
    }

    return response
  } catch (error) {
    throw error
  }
}

async function getPostById(id: string) {
  try {
    const response = await supabase
      .from('posts')
      .select(
        `
        *,
        users (
          nickname
        ),
        post_stats (
          viewCount,
          likeCount,
          commentCount
        )
      `
      )
      .eq('id', id)
      .single()

    return response
  } catch (error) {
    throw error
  }
}

async function getCommentsByPostId(postId: string) {
  try {
    const response = await supabase.from('post_comments').select('*').eq('postId', postId)

    return response
  } catch (error) {
    throw error
  }
}

export { createPost, getCommentsByPostId, getPostById }

