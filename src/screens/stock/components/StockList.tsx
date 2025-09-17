import CommonLoading from '@/components/feedback/CommonLoading'
import { StockListType } from '@/types/stock/stock'
import React from 'react'
import { FlatList } from 'react-native'
import StockItem from './StockItem'

type StockListProps = {
  stockList: StockListType
}
const StockList = ({ stockList }: StockListProps) => {
  return (
    <FlatList
      data={stockList}
      renderItem={({ item, index }) => <StockItem key={item.id} stock={item} />}
      contentContainerStyle={{ gap: 16 }}
      onEndReached={() => {}} // 하단 도달시 추가 로드
      onEndReachedThreshold={0.5} // 하단 50% 지점에서 트리거
      ListFooterComponent={CommonLoading} // 하단 로딩 인디케이터
    />
  )
}

export default StockList
