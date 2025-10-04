import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Image, Text, View } from 'react-native'

const ErrorNotice = () => {

  return (
    <Container>
      <LogoContainer>
        <Logo source={require('@assets/images/icon.png')} />
      </LogoContainer>
      <Title>정부 데이터센터 화재로 인한 서비스 장애 안내</Title>
      <TextContainer>
        <TextLine>
          현재 정부 데이터센터 화재 사고로 인해 공공데이터포털 API가 정상적으로 작동하지 않고
          있습니다.
        </TextLine>
        <TextLine>
          이로 인해 저희 서비스 내 종목 관련 기능이 일시적으로 원활히 제공되지 않는 점 깊이
          사과드립니다.
        </TextLine>
        <TextLine>
          예상치 못한 외부 요인으로 불편을 드리게 되어 송구스러운 마음뿐이며, 상황이 복구되는 즉시
          정상적인 서비스를 제공할 수 있도록 최선을 다하겠습니다.
        </TextLine>
        <TextLine>
          항상 믿고 이용해주시는 여러분께 다시 한 번 진심 어린 사과의 말씀을 드립니다.
        </TextLine>
      </TextContainer>
    </Container>
  )
}

export default ErrorNotice

const Container = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  row-gap: 24px;
  padding: 16px;
`

const LogoContainer = styled(View)`
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.1);
`

const Logo = styled(Image)`
  width: 100%;
  height: 100%;
`

const Title = styled(Text)`
  font-size: 16px;
  color: ${theme.colors.core.white};
  font-weight: ${theme.fontWeights.bold};
`

const TextContainer = styled(View)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 8px;
`

const TextLine = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.core.white};
`
