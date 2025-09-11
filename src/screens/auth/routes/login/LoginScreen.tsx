import { supabase } from '@/lib/supabaseClient'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, TouchableOpacity, View } from 'react-native'
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
          skipBrowserRedirect: true,
        },
      })

      if (error) throw error

      if (data?.url) {
        setAuthUrl(data.url)
        setShowWebView(true)
      }
    } catch {
      Alert.alert('로그인 실패')
      router.replace('/')
    }
  }

  // WebView에서 URL 변경 감지
  const handleNavigationStateChange = async (navState: any) => {
    // access_token이 포함된 URL인지 확인
    if (navState.url.includes('access_token=')) {
      try {
        // URL에서 access_token 추출
        const params = new URLSearchParams(navState.url.split('#')[1])
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')

        // 세션 설정
        const {
          data: { session },
          error,
        } = await supabase.auth.setSession({
          access_token: accessToken!,
          refresh_token: refreshToken!,
        })

        if (error) throw error

        if (session) {
          setShowWebView(false)
          // 홈 화면으로 이동
          router.replace('/')
        }
      } catch {
        Alert.alert('로그인 실패')
        router.replace('/')
      }
    }
  }

  return (
    <>
      {showWebView ? (
        <WebView source={{ uri: authUrl }} onNavigationStateChange={handleNavigationStateChange} />
      ) : (
        <Container>
          <BackButton onPress={() => router.replace('/')}>
            <Ionicons
              name='chevron-back'
              size={theme.iconSizes.lg}
              color={theme.colors.core.white}
            />
          </BackButton>
          <Logo source={require('@assets/images/icon.png')} style={{ width: 100, height: 100 }} />
          <TouchableOpacity onPress={signInWithKakao}>
            <KakaoLogin source={require('@assets/images/kakao-login.png')} />
          </TouchableOpacity>
        </Container>
      )}
    </>
  )
}

export default LoginScreen

const Container = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  flex: 1;
  background-color: ${theme.colors.background.default};
  row-gap: 24px;
`

const Logo = styled(Image)`
  border-radius: ${`${theme.border.radius.full}px`};
`

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  left: 16px;
`

const KakaoLogin = styled(Image)``
