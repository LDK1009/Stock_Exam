import { supabase } from '@/lib/supabaseClient'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, BackHandler, Image, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'

const LoginScreen = () => {
  const [showWebView, setShowWebView] = useState(false)
  const [authUrl, setAuthUrl] = useState('')

  ////////// 카카오 로그인 버튼 클릭 함수
  const signInWithKakao = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          skipBrowserRedirect: true, // 브라우저 리다이렉트 건너뛰고 로그인 URL만 받음(직접 브라우저를 열고 제어 가능)
        },
      })

      // 에러 발생 시 에러 처리
      if (error) throw error

      // URL이 있다면
      if (data?.url) {
        // URL 상태 업데이트
        setAuthUrl(data.url)
        // WebView 표시
        setShowWebView(true)
      }
    } catch(error) {
      // 에러 발생 시 로그인 페이지로 이동
      router.replace('/auth/login')
      throw error
    }
  }

  ////////// WebView URL 변경 감지 함수
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
          router.replace('/auth/callback')
        }
      } catch {
        Alert.alert('로그인 실패')
        router.replace('/auth/login')
      }
    }
  }

  // 백핸들러(뒤로가기 버튼 눌렀을 때)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      router.replace('/') // 홈으로 이동
      return true // 기본 동작 방지
    })

    return () => backHandler.remove()
  }, [])

  return (
    <>
      {showWebView ? (
        <WebView source={{ uri: authUrl }} onNavigationStateChange={handleNavigationStateChange} />
      ) : (
        <Container>
          {/* 뒤로가기 버튼 */}
          <BackButton onPress={() => router.replace('/')}>
            <Ionicons
              name='chevron-back'
              size={theme.iconSizes.lg}
              color={theme.colors.core.white}
            />
          </BackButton>
          {/* 로고 */}
          <Logo source={require('@assets/images/icon.png')} style={{ width: 100, height: 100 }} />
          {/* 카카오 로그인 버튼 */}
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
