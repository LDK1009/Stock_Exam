import CommonText from '@/components/display/CommonText'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const StockDetailScreen = () => {
  const { id } = useLocalSearchParams()

  return (
    <Container>
      <CommonText>StockDetailScreen</CommonText>
      <CommonText>{id as string}</CommonText>
    </Container>
  )
}

export default StockDetailScreen

const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.background.default};
`


