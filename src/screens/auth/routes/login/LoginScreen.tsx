import { supabase } from '@/lib/supabaseClient'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Button } from 'react-native'
import WebView from 'react-native-webview'

const LoginScreen = () => {
  const [showWebView, setShowWebView] = useState(false)
  const [authUrl, setAuthUrl] = useState('')

  const signInWithKakao = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: 'stockexam://auth/callback',
          skipBrowserRedirect: true
        },
      })

      if (error) throw error
      
      if (data?.url) {
        setAuthUrl(data.url)
        setShowWebView(true)
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  // WebView에서 URL 변경 감지
  const handleNavigationStateChange = async (navState) => {
    // access_token이 포함된 URL인지 확인
    if (navState.url.includes('access_token=')) {
      try {
        // URL에서 access_token 추출
        const params = new URLSearchParams(navState.url.split('#')[1])
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')

        // 세션 설정
        const { data: { session }, error } = await supabase.auth.setSession({
          access_token: accessToken!,
          refresh_token: refreshToken!
        })

        if (error) throw error
        
        if (session) {
          setShowWebView(false)
          // 홈 화면으로 이동
          router.replace('/')
        }
      } catch (error) {
        Alert.alert('Error', error.message)
      }
    }
  }

  return (
    <>
      {showWebView ? (
        <WebView
          source={{ uri: authUrl }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      ) : (
        <Button onPress={signInWithKakao} title="카카오로 로그인" />
      )}
    </>
  )
}

export default LoginScreen