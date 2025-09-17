type StockType = {
  id: string // 종목코드
  name: string // 종목명
  closingPrice: number // 종가
  fluctuationRate: number // 등락률
  marketCapitalization: number // 시가총액
}

type StockListType = StockType[]

export type { StockListType, StockType }

