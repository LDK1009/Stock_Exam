import CommonText from '@/components/display/CommonText'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const SignupScreen = () => {

  function goToHome() {
    router.push('/')
  }
  
  return (
    <Container>
      <CommonText>SignupScreen</CommonText>
      <GoToHomeButton onPress={goToHome}>
        <GoToHomeButtonText>홈으로 이동</GoToHomeButtonText>
      </GoToHomeButton>
    </Container>
  )
}

export default SignupScreen

const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.background.default};
`

const GoToHomeButton = styled(TouchableOpacity)`
  width: 100%;
  height: 40px;
  background-color: ${theme.colors.primary.main};
`

const GoToHomeButtonText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.core.white};
`
