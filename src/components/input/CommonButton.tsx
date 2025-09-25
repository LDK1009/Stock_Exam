import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

// 간단한 버튼 컴포넌트
interface ButtonProps {
  title: string
  onPress: () => void
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
  size?: 'small' | 'medium' | 'large'
  borderRadius?: string
  bold?: boolean
}

const CommonButton = ({
  title,
  onPress,
  icon,
  iconPosition = 'start',
  size = 'medium',
  borderRadius,
  bold = false,
}: ButtonProps) => {
  return (
    <Container onPress={onPress} size={size} borderRadius={borderRadius}>
      {iconPosition === 'start' && icon}
      <ButtonText size={size} bold={bold}>
        {title}
      </ButtonText>
      {iconPosition === 'end' && icon}
    </Container>
  )
}

export default CommonButton

type ContainerProps = {
  size: 'small' | 'medium' | 'large'
  borderRadius?: string
}

const Container = styled(TouchableOpacity)<ContainerProps>`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 4px;

  width: 100%;
  padding: ${({ size }) => (size === 'small' ? '4px' : size === 'medium' ? '8px' : '16px')};

  border-radius: ${({ borderRadius }) => borderRadius || '8px'};
  background-color: ${theme.colors.background.paper};
`

type ButtonTextProps = ContainerProps & {
  bold: boolean
}

const ButtonText = styled(Text)<ButtonTextProps>`
  color: ${theme.colors.core.white};
  font-size: ${({ size }) =>
    size === 'small'
      ? `${theme.fontSizes.caption}px`
      : size === 'medium'
        ? `${theme.fontSizes.body}px`
        : `${theme.fontSizes.subtitle}px`};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`
