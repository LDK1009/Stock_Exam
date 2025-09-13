import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NewsScreen = () => {
  return (
    <Container>
      <Title>NEWS</Title>
      <SubTitle>준비중인 페이지입니다.</SubTitle>
    </Container>
  )
}

export default NewsScreen

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
  font-size: 16px;
  color: ${theme.colors.black[500]};
`
