import { StockType } from '@/types/stock/stock'
import { getPreviousDate8Digits } from '@/utils/time'
import axios from 'axios'

async function getStockList() {
  try {
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
        id: item.isinCd,
        name: item.itmsNm,
        closingPrice: Number(item.clpr),
        fluctuationRate: Number(item.fltRt),
        marketCapitalization: Number(item.mrktTotAmt),
      }))
      .sort((a: StockType, b: StockType) => b.marketCapitalization - a.marketCapitalization)

    return returnData
  } catch (error) {
    throw error
  }
}

async function getStockDetailById(id: string) {
  try {
    let data

    for (let i = 1; i <= 14; i++) {
      const requestDate = getPreviousDate8Digits(i)

      const response = await axios.get(
        `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${process.env.EXPO_PUBLIC_PUBLIC_DATA_PORTAL_ENCODING_API_KEY}&numOfRows=9999&pageNo=1&resultType=json&basDt=${requestDate}&mrktCls=KOSPI&isinCd=${id}`
      )

      if (response.data.response.body.items.item.length > 0) {
        data = response.data.response.body.items.item
        break
      }
    }

    const { itmsNm, isinCd, clpr, fltRt, mrktTotAmt } = data[0]

    const returnData = {
      id: isinCd,
      name: itmsNm,
      closingPrice: Number(clpr),
      fluctuationRate: Number(fltRt),
      marketCapitalization: Number(mrktTotAmt),
    }

    return returnData
  } catch (error) {
    throw error
  }
}

async function getCorporateRegistrationNumber(isinCd: string) {
  try {
    const response = await axios.get(
      `https://apis.data.go.kr/1160100/service/GetKrxListedInfoService/getItemInfo?serviceKey=${process.env.EXPO_PUBLIC_PUBLIC_DATA_PORTAL_ENCODING_API_KEY}&numOfRows=1&resultType=json&isinCd=${isinCd}`
    )

    const crno = response.data.response.body.items.item[0].crno

    return crno
  } catch (error) {
    throw error
  }
}

export { getCorporateRegistrationNumber, getStockDetailById, getStockList }

