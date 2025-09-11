import { router } from 'expo-router'
import { useEffect } from 'react'

export default function AuthCallback() {
  useEffect(() => {
    // 로그인 성공 후 홈 화면으로 리다이렉트
    router.replace('/profile')
  }, [])

  return null
}
