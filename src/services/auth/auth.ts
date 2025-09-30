import { supabase } from '@/lib/supabaseClient'

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
      error,
    } = await supabase.auth.getUser()

    return user?.id
  } catch (error) {
    throw error
  }
}

export { getUserId, isAuthenticated, logout }

