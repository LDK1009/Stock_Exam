import { getStockList } from '@/services/api/public-data-portal/stock'
import { useStockStore } from '@/stores/screens/stock/stock'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import StockList from './components/StockList'

const StockScreen = () => {
  const { stockList, setStockList } = useStockStore()

  async function fetchStockData() {
    const stockListData = await getStockList()
    setStockList(stockListData)
  }

  useFocusEffect(
    useCallback(() => {
      fetchStockData()
    }, [])
  )

  return (
    <Container>
      <StockList stockList={stockList} />
    </Container>
  )
}

export default StockScreen

const Container = styled(View)`
  flex: 1;
  ${mixinFlex('column', 'flex-start', 'center')}
  padding: 32px 16px;
  padding-bottom: 0px;
  row-gap: 24px;
  background-color: ${theme.colors.background.default};
`
