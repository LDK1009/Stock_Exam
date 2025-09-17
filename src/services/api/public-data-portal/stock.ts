import { StockType } from '@/types/stock/stock'
import axios from 'axios'

async function getStockList() {
  const response = await axios.get(
    `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${process.env.EXPO_PUBLIC_PUBLIC_DATA_PORTAL_ENCODING_API_KEY}&numOfRows=9999&pageNo=1&resultType=json&basDt=20250916&mrktCls=KOSPI`
  )

  const data = response.data.response.body.items.item

  const returnData = data
    .map((item: any) => ({
      id: item.srtnCd,
      name: item.itmsNm,
      closingPrice: Number(item.clpr),
      fluctuationRate: Number(item.fltRt),
      marketCapitalization: Number(item.mrktTotAmt),
    }))
    .sort((a: StockType, b: StockType) => b.marketCapitalization - a.marketCapitalization)

  return returnData
}

export { getStockList }

