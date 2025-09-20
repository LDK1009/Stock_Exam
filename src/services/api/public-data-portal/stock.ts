import { StockType } from '@/types/stock/stock'
import { getPreviousDate8Digits } from '@/utils/time'
import axios from 'axios'

async function getStockList() {
  let data

  for (let i = 1; i <= 14; i++) {
    const requestDate = getPreviousDate8Digits(i)

    const response = await axios.get(
      `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${process.env.EXPO_PUBLIC_PUBLIC_DATA_PORTAL_ENCODING_API_KEY}&numOfRows=9999&pageNo=1&resultType=json&basDt=${requestDate}&mrktCls=KOSPI`
    )

    if (response.data.response.body.items.item.length > 0) {
      // console.log('데이터 발견일자', requestDate)
      data = response.data.response.body.items.item
      break
    }
  }

  // console.log('data', data)

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

