import CommonLoading from '@/components/feedback/CommonLoading'
import { getStockDetailById } from '@/services/api/public-data-portal/stock'
import { mixinContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { StockType } from '@/types/stock/stock'
import styled from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import NewsSection from './components/NewsSection'
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
      <ScrollContainer contentContainerStyle={{ rowGap: 24, paddingBottom: 100 }}>
        <Section>
          <SectionTitle>개요</SectionTitle>
          <OverviewSection stock={stock} />
        </Section>
        <Section>
          <SectionTitle>문제</SectionTitle>
          <StockQuiz />
        </Section>
        <Section>
          <SectionTitle>뉴스</SectionTitle>
          <NewsSection stock={stock} />
        </Section>
      </ScrollContainer>
    </Container>
  )
}

export default StockDetailScreen

const Container = styled(SafeAreaView)`
  ${mixinContainer}
  ${mixinFlex('column', 'flex-start', 'stretch')}
  background-color: ${theme.colors.background.default};
`

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 32px 16px;
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
