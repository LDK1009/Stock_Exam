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

export { createPost }

