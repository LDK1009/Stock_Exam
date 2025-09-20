import CommonLoading from '@/components/feedback/CommonLoading'
import { getStockDetailById } from '@/services/api/public-data-portal/stock'
import { mixinContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { StockType } from '@/types/stock/stock'
import styled from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import OverviewSection from './components/OverviewSection'
import StockQuiz from './components/QuizSection'

const StockDetailScreen = () => {
  const { id } = useLocalSearchParams()

  const [stock, setStock] = useState<StockType | null>(null)

  async function fetchStockDetail() {
    const stockDetail = await getStockDetailById(id as string)
    setStock(stockDetail)
  }

  useFocusEffect(
    useCallback(() => {
      fetchStockDetail()
    }, [])
  )

  if (!stock) {
    return (
      <Container>
        <CommonLoading />
      </Container>
    )
  }

  return (
    <Container>
      <Section>
        <SectionTitle>개요</SectionTitle>
        <OverviewSection stock={stock as StockType} />
      </Section>
      <Section>
        <SectionTitle>문제</SectionTitle>
        <StockQuiz />
      </Section>
    </Container>
  )
}

export default StockDetailScreen

const Container = styled(SafeAreaView)`
  ${mixinContainer}
  ${mixinFlex('column', 'flex-start', 'stretch')}
  padding: 32px 16px;
  padding-bottom: 0px;
  row-gap: 24px;
  background-color: ${theme.colors.background.default};
`

const SectionTitle = styled(Text)`
  width: 100%;
  font-size: 28px;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
  padding-left: 16px;
`

const Section = styled(View)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 16px;
`
