import { supabase } from '@/lib/supabaseClient'

async function createPostStats(postId: number) {
  try {
    const response = await supabase
      .from('post_stats')
      .insert({
        postId,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
      })
      .select()

    return response
  } catch (error) {
    throw error
  }
}

async function incrementPostViewCount(postId: number) {
  try {
    const { data: current } = await supabase
      .from('post_stats')
      .select('viewCount')
      .eq('postId', postId)
      .single()

    const response = await supabase
      .from('post_stats')
      .update({ viewCount: (current?.viewCount || 0) + 1 })
      .eq('postId', postId)

    return response
  } catch (error) {
    throw error
  }
}

async function incrementPostLikeCount(postId: number) {
  try {
    const { data: current } = await supabase
      .from('post_stats')
      .select('likeCount')
      .eq('postId', postId)
      .single()

    const response = await supabase
      .from('post_stats')
      .update({ likeCount: (current?.likeCount || 0) + 1 })
      .eq('postId', postId)

    return response
  } catch (error) {
    throw error
  }
}

async function decrementPostLikeCount(postId: number) {
  try {
    const { data: current } = await supabase
      .from('post_stats')
      .select('likeCount')
      .eq('postId', postId)
      .single()

    const response = await supabase
      .from('post_stats')
      .update({ likeCount: (current?.likeCount || 0) - 1 })
      .eq('postId', postId)

    return response
  } catch (error) {
    throw error
  }
}

async function incrementPostCommentCount(postId: number) {
  try {
    const { data: current } = await supabase
      .from('post_stats')
      .select('commentCount')
      .eq('postId', postId)
      .single()

    const response = await supabase
      .from('post_stats')
      .update({ commentCount: (current?.commentCount || 0) + 1 })
      .eq('postId', postId)

    return response
  } catch (error) {
    throw error
  }
}

async function decrementPostCommentCount(postId: number) {
  try {
    const { data: current } = await supabase
      .from('post_stats')
      .select('commentCount')
      .eq('postId', postId)
      .single()

    const response = await supabase
      .from('post_stats')
      .update({ commentCount: (current?.commentCount || 0) - 1 })
      .eq('postId', postId)

    return response
  } catch (error) {
    throw error
  }
}

export {
    createPostStats,
    decrementPostCommentCount,
    decrementPostLikeCount,
    incrementPostCommentCount,
    incrementPostLikeCount,
    incrementPostViewCount
}

