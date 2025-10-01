import { createUser, isNewUser } from '@/services/auth/auth'
import { router } from 'expo-router'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'

export default function AuthCallback() {
  async function authCallback() {
    // 신규 회원 여부 확인
    const userIsNewUser = await isNewUser()

    ///// 신규 회원인 경우 회원가입 페이지로 이동
    if (userIsNewUser) {
      console.log('신규 회원')
      await createUser()
      router.replace('/auth/signup')

      // 토스트 띄우기
      setTimeout(() => {
        Toast.show({
          type: 'info',
          text1: '회원가입을 진행해주세요.',
        })
      }, 0)
    } else {
      console.log('기존 회원')
      router.replace('/')

      // 토스트 띄우기
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: '로그인 완료',
        })
      }, 0)
    }
  }

  useEffect(() => {
    authCallback()
    // 로그인 성공 후 홈 화면으로 리다이렉트
    // router.replace('/profile')
  }, [])

  return null
}
