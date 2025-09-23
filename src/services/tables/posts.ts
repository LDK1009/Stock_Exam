import { supabase } from '@/lib/supabaseClient'
import { PostType } from '@/types/community/community'

async function createPost(postData: PostType) {
  try {
    const response = await supabase.from('posts').insert(postData).select()

    return response
  } catch (error) {
    throw error
  }
}

async function getPostById(id: string) {
  try {
    const response = await supabase.from('posts').select('*').eq('id', id).single()

    return response
  } catch (error) {
    throw error
  }
}

export { createPost, getPostById }

