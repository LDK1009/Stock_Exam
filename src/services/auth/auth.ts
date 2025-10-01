import { supabase } from '@/lib/supabaseClient'
import { generateRandomNickname } from '@/utils/random'
////////// 신규 회원 여부 확인
async function isNewUser() {
  try {
    const userId = await getUserId()

    // userId가 없으면 로그인되지 않은 상태
    if (!userId) {
      throw new Error('로그인되지 않은 상태')
    }

    // users 테이블에서 해당 userId 조회
    const { data } = await supabase.from('users').select('id').eq('id', userId).single()

    // 데이터가 있으면 기존 회원, 없으면 신규 회원
    if (data) {
      return false
    } else {
      return true
    }
  } catch (error) {
    throw error
  }
}

////////// 유저 추가
async function createUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('유저 정보가 없습니다.')
    }

    // 유저 정보 추출
    const { id, email } = user

    // 랜덤 닉네임 생성
    const { nickname, profileCharacter } = generateRandomNickname()

    // 유저 데이터 추가
    const {
      data: { returnData },
    } = await supabase
      .from('users')
      .insert({
        id,
        email,
        nickname: nickname,
        profileImageSrc: null,
        profileCharacter: profileCharacter,
        biography: null,
        level: 0,
        experience: 0,
        notificationEnabled: false,
      })
      .select()
      .single()

    return returnData
  } catch (error) {
    throw error
  }
}

////////// 로그인 여부 확인
async function isAuthenticated(): Promise<boolean> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  // 로그인 안됨
  if (!session || error) {
    return false
  }
  // 로그인 됨
  else {
    return true
  }
}

////////// 로그아웃
async function logout() {
  await supabase.auth.signOut()
}

////////// 사용자 ID 조회
async function getUserId() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    return user?.id
  } catch (error) {
    throw error
  }
}

export { createUser, getUserId, isAuthenticated, isNewUser, logout }

