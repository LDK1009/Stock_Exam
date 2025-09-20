import CommonLoading from '@/components/feedback/CommonLoading'
import { getStockDetailById } from '@/services/api/public-data-portal/stock'
import { mixinContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { StockType } from '@/types/stock/stock'
import styled from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native'
import Overview from './components/Overview'

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
      <Overview stock={stock as StockType} />
    </Container>
  )
}

export default StockDetailScreen

const Container = styled(SafeAreaView)`
  ${mixinContainer}
  ${mixinFlex('column', 'flex-start', 'center')}
  padding: 32px 16px;
  padding-bottom: 0px;
  row-gap: 24px;
  background-color: ${theme.colors.background.default};
`
