import { supabase } from '@/lib/supabaseClient'

const isAuthenticated = async (): Promise<boolean> => {
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

const logout = async () => {
  await supabase.auth.signOut()
}

export { isAuthenticated, logout }

