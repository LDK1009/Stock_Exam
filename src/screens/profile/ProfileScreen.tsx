import { isAuthenticated } from '@/services/auth/auth'
import { mixinContainer, mixinContentContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native'
import AnalyticsSection from './components/AnalyticsSection'
import LearningOverviewSection from './components/learning-overview/LearningOverviewSection'
import LogoutButton from './components/LogoutButton'
import ProfileSection from './components/ProfileSection'

const ProfileScreen = () => {
  const router = useRouter()

  ////////// 로그인 체크
  async function loginCheck() {
    const userIsAuthenticated = await isAuthenticated()

    // 로그인이 안되어있으면 로그인 페이지로 이동
    if (!userIsAuthenticated) {
      router.replace('/auth/login')
    }
  }

  ////////// 화면 포커스될 때마다 로그인 체크
  useFocusEffect(
    React.useCallback(() => {
      loginCheck()
    }, [])
  )

  return (
    <Container>
      <ProfileSection />
      <LearningOverviewSection/>
      <AnalyticsSection/>
      <LogoutButton />
    </Container>
  )
}

export default ProfileScreen

const Container = styled(SafeAreaView)`
  ${mixinContainer}
  ${mixinContentContainer(4, 3)}
  ${mixinFlex('column', 'flex-start', 'center')}

  padding-top:16px;
  padding-bottom: 0px;

  background-color: ${theme.colors.background.default};
`
