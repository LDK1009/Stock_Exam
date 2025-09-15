import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

// 간단한 버튼 컴포넌트
interface ButtonProps {
  title: string
  onPress: () => void
  size?: 'small' | 'medium' | 'large'
}

const CommonButton = ({ title, onPress, size = 'medium' }: ButtonProps) => {
  return (
    <Container onPress={onPress} size={size}>
      <ButtonText size={size}>{title}</ButtonText>
    </Container>
  )
}

export default CommonButton

type ContainerProps = {
  size: 'small' | 'medium' | 'large'
}

const Container = styled(TouchableOpacity)<ContainerProps>`
  ${mixinFlex('row', 'center', 'center')}
  width: 100%;
  padding: ${({ size }) => (size === 'small' ? '4px' : size === 'medium' ? '8px' : '16px')};

  border-radius: 8px;
  background-color: ${theme.colors.background.paper};
`

const ButtonText = styled(Text)<ContainerProps>`
  color: ${theme.colors.core.white};
  font-size: ${({ size }) =>
    size === 'small'
      ? `${theme.fontSizes.caption}px`
      : size === 'medium'
        ? `${theme.fontSizes.body}px`
        : `${theme.fontSizes.subtitle}px`};
`
