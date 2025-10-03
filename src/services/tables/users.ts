import { supabase } from '@/lib/supabaseClient'
import { UpdateUserType } from '@/types/auth/user'
import { getUserId } from '../auth/auth'

////////// 유저 정보 가져오기
async function getUser() {
  try {
    const userId = await getUserId()

    if (!userId) {
      throw new Error('유저 정보가 없습니다.')
    }

    const { data } = await supabase.from('users').select('*').eq('id', userId).single()

    return data
  } catch (error) {
    throw error
  }
}

////////// 유저 정보 수정
type UpdateUserProfileType = {
  userId: string
  updateData: UpdateUserType
}

async function updateUserProfile(params: UpdateUserProfileType) {
  try {
    const { userId, updateData } = params
    const { data } = await supabase.from('users').update(updateData).eq('id', userId).select()

    return data
  } catch (error) {
    throw error
  }
}

////////// 회원가입 시 유저 정보 완성
type CompleteUserProfileType = {
  nickname: string
  profileCharacter: string
  biography: string
}

async function completeUserProfile(params: CompleteUserProfileType) {
  try {
    const userId = await getUserId()
    const { nickname, profileCharacter, biography } = params

    const { data } = await supabase
      .from('users')
      .update({
        nickname: nickname,
        profileCharacter: profileCharacter,
        biography: biography,
      })
      .eq('id', userId)
      .select()
    return data
  } catch (error) {
    throw error
  }
}

export { completeUserProfile, getUser, updateUserProfile }

