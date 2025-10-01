import { logout } from '@/services/auth/auth'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'

const LogoutButton = () => {
  ////////// 로그아웃
  async function logoutFunction() {
    await logout()
    router.push('/')

    setTimeout(() => {
      Toast.show({
        type: 'error',
        text1: '로그아웃 완료',
      })
    }, 0)
  }

  return (
    <Container onPress={logoutFunction}>
      <LogoutText>로그아웃</LogoutText>
    </Container>
  )
}

export default LogoutButton

const Container = styled(TouchableOpacity)`
  width: 100%;
  ${mixinFlex('row', 'center', 'center')}
  background-color: ${theme.colors.status.error};
  padding: 8px;
  border-radius: 8px;
`

const LogoutText = styled(Text)`
  color: ${theme.colors.core.white};
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${`${theme.fontWeights.bold}`};
`
