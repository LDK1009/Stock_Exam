import { StockListType } from '@/types/stock/stock'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  stockList: StockListType
  setStockList: (stockList: StockListType) => void
}

export const useStockStore = create<StoreType>((set) => ({
  stockList: [],
  setStockList: (stockList) => set({ stockList: stockList }),
}))
