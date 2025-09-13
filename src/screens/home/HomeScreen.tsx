import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// 홈 화면 예시
export const HomeScreen = () => {
  const [text, setText] = useState('')

  const handlePress = () => {
    alert(`입력한 텍스트: ${text}`)
  }

  const goToQuiz = () => {
    router.push('/quiz')
  }

  return (
    <Container>
      <Title>주식고사</Title>
      <SubTitle>모의고사 기반 주식 학습 플랫폼</SubTitle>
      <Button onPress={goToQuiz}>
        <ButtonText>시작하기</ButtonText>
      </Button>
    </Container>
  )
}

export default HomeScreen

const Container = styled(SafeAreaView)`
  flex: 1;
  ${mixinFlex('column', 'center', 'center')}
  background-color: ${theme.colors.background.default};
`

const Title = styled(Text)`
  font-size: 40px;
  font-weight: bold;
  color: ${theme.colors.core.white};
`

const SubTitle = styled(Text)`
  margin-top: 8px;
  margin-bottom: 32px;
  font-size: 16px;
  color: ${theme.colors.black[500]};
`

const Button = styled(TouchableOpacity)`
  width: 200px;
  height: 40px;
  ${mixinFlex('row', 'center', 'center')}
  border-radius: 8px;
  background-color: ${theme.colors.primary.main};
`

const ButtonText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.core.white};
`
