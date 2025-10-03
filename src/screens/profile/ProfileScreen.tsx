import { isAuthenticated } from '@/services/auth/auth'
import { getUser } from '@/services/tables/users'
import { useUserProfileStore } from '@/stores/screens/profile/userProfile'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native'
import LogoutButton from './components/LogoutButton'
import ProfileSection from './components/ProfileSection'
import LearningOverviewSection from './components/learning-overview/LearningOverviewSection'

const ProfileScreen = () => {
  ///// 라우터
  const router = useRouter()
  ///// 스토어
  const { setUserProfile } = useUserProfileStore()

  ////////// 로그인 체크
  async function loginCheck() {
    const userIsAuthenticated = await isAuthenticated()

    // 로그인이 안되어있으면 로그인 페이지로 이동
    if (!userIsAuthenticated) {
      router.replace('/auth/login')
    }
  }

  ////////// 유저 프로필 정보 가져오기

  async function fetchUserProfile() {
    const userProfile = await getUser()
    if (userProfile) {
      setUserProfile(userProfile)
    }
  }

  ////////// 화면 포커스될 때마다 로그인 체크
  useFocusEffect(
    React.useCallback(() => {
      loginCheck()
      fetchUserProfile()
    }, [])
  )

  return (
    <Container>
      {/* 프로필 */}
      <ProfileSection />
      {/* 학습 통계 */}
      <LearningOverviewSection />
      {/* 분석 */}
      {/* <AnalyticsSection/> */}
      {/* 로그아웃 버튼 */}
      <LogoutButton />
    </Container>
  )
}

export default ProfileScreen

const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 32px;
  row-gap: 32px;
  ${mixinFlex('column', 'flex-start', 'center')}

  background-color: ${theme.colors.background.default};
`
