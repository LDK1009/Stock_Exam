import CommonTooltip from '@/components/display/CommonTooltip'
import { getSummaryFinancialStatements } from '@/services/api/public-data-portal/stock'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { StockType } from '@/types/stock/stock'
import { formatFluctuationRate, formatKoreanCurrency } from '@/utils/number'
import styled from '@emotion/native'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

type IndicatorType = {
  key: string
  value: number | string
  unit: string
  explanation: string
}

type PropsType = {
  stock: StockType
}

const IndicatorSection = ({ stock }: PropsType) => {
  const [updatedAt, setUpdatedAt] = useState('')

  // 손익계산서
  const [incomeStatement, setIncomeStatement] = useState<IndicatorType[]>([
    // 손익계산서 항목
    {
      key: '매출액',
      value: 0,
      unit: '원',
      explanation: '매출액 = 판매수량 × 판매단가',
    },
    {
      key: '영업이익',
      value: 0,
      unit: '원',
      explanation: '영업이익 = 매출액 - 매출원가 - 판관비',
    },
    {
      key: '법인세비용차감전순이익',
      value: 0,
      unit: '원',
      explanation: '법인세비용차감전순이익 = 영업이익 + 영업외수익 - 영업외비용',
    },
    {
      key: '당기순이익',
      value: 0,
      unit: '원',
      explanation: '당기순이익 = 법인세비용차감전순이익 - 법인세비용',
    },
  ])

  // 재무상태표
  const [balanceSheet, setBalanceSheet] = useState<IndicatorType[]>([
    {
      key: '총자산',
      value: 0,
      unit: '원',
      explanation: '총자산 = 유동자산 + 비유동자산',
    },
    {
      key: '총부채',
      value: 0,
      unit: '원',
      explanation: '총부채 = 유동부채 + 비유동부채',
    },
    {
      key: '자본금',
      value: 0,
      unit: '원',
      explanation: '자본금 = 발행주식수 × 액면가',
    },
    {
      key: '총자본',
      value: 0,
      unit: '원',
      explanation: '총자본 = 총자산 - 총부채',
    },
    {
      key: '부채비율',
      value: 0,
      unit: '%',
      explanation: '부채비율 = (총부채 ÷ 총자본) × 100',
    },
  ])

  // 요약 재무제표 조회
  async function fetchSummaryFinancialStatements() {
    try {
      const data = await getSummaryFinancialStatements(stock.id)

      // 손익계산서 상태 업데이트
      setIncomeStatement([
        // 손익계산서 항목
        {
          key: '매출액',
          value: formatKoreanCurrency(data.enpSaleAmt),
          unit: '',
          explanation: '매출액 = 판매수량 × 판매단가',
        },
        {
          key: '영업이익',
          value: formatKoreanCurrency(data.enpBzopPft),
          unit: '',
          explanation: '영업이익 = 매출액 - 매출원가 - 판관비',
        },
        {
          key: '법인세비용차감전순이익',
          value: formatKoreanCurrency(data.iclsPalClcAmt),
          unit: '',
          explanation: '법인세비용차감전순이익 = 영업이익 + 영업외수익 - 영업외비용',
        },
        {
          key: '당기순이익',
          value: formatKoreanCurrency(data.enpCrtmNpf),
          unit: '',
          explanation: '당기순이익 = 법인세비용차감전순이익 - 법인세비용',
        },
      ])

      // 재무상태표 상태 업데이트
      setBalanceSheet([
        // 재무상태표 항목
        {
          key: '총자산',
          value: formatKoreanCurrency(data.enpTastAmt),
          unit: '',
          explanation: '총자산 = 유동자산 + 비유동자산',
        },
        {
          key: '총부채',
          value: formatKoreanCurrency(data.enpTdbtAmt),
          unit: '',
          explanation: '총부채 = 유동부채 + 비유동부채',
        },
        {
          key: '자본금',
          value: formatKoreanCurrency(data.enpCptlAmt),
          unit: '',
          explanation: '자본금 = 발행주식수 × 액면가',
        },
        {
          key: '총자본',
          value: formatKoreanCurrency(data.enpTcptAmt),
          unit: '',
          explanation: '총자본 = 총자산 - 총부채',
        },
        {
          key: '부채비율',
          value: formatFluctuationRate(data.fnclDebtRto),
          unit: '%',
          explanation: '부채비율 = (총부채 ÷ 총자본) × 100',
        },
      ])

      const baseDate = data.basDt
      const formattedDate = `${baseDate.slice(0, 4)}.${baseDate.slice(4, 6)}.${baseDate.slice(6, 8)}`

      console.log('data', JSON.stringify(data, null, 2))
      setUpdatedAt(formattedDate)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '재무제표 조회에 실패했습니다.',
      })
    }
  }

  // 포커스 감지
  useFocusEffect(
    useCallback(() => {
      fetchSummaryFinancialStatements()
    }, [])
  )

  // 자세히보기 버튼 클릭
  function handleReadMore() {
    Toast.show({
      type: 'info',
      text1: '준비중인 기능입니다.',
    })
  }

  return (
    <Container>
      <Header>
        <StockName>{stock.name}</StockName>
        <UpdatedAt>{updatedAt}</UpdatedAt>
      </Header>
      <IndicatorList>
        {/* 손익계산서 */}
        <IncomeStatementContainer>
          {incomeStatement.map((indicator: IndicatorType) => (
            <CommonTooltip key={indicator.key} content={indicator.explanation} left={40}>
              <IndicatorRow>
                <IndicatorKey>{indicator.key}</IndicatorKey>
                <IndicatorValue>
                  {indicator.value}
                  {indicator.unit}
                </IndicatorValue>
              </IndicatorRow>
            </CommonTooltip>
          ))}
        </IncomeStatementContainer>
        {/* 재무상태표 */}
        <BalanceSheetContainer>
          {balanceSheet.map((indicator: IndicatorType) => (
            <CommonTooltip key={indicator.key} content={indicator.explanation} top={37} left={40}>
              <IndicatorRow>
                <IndicatorKey>{indicator.key}</IndicatorKey>
                <IndicatorValue>
                  {indicator.value}
                  {indicator.unit}
                </IndicatorValue>
              </IndicatorRow>
            </CommonTooltip>
          ))}
        </BalanceSheetContainer>
      </IndicatorList>
      <ReadMoreButton onPress={handleReadMore}>
        <ReadMoreButtonText>자세히보기</ReadMoreButtonText>
      </ReadMoreButton>
    </Container>
  )
}

export default IndicatorSection

const Container = styled(View)`
  ${mixinFlex('column', 'flex-start', 'center')}
  row-gap: 24px;
  width: 100%;
  padding: 24px;
  background-color: ${theme.colors.background.paper};
  border-radius: 16px;
`

const Header = styled(View)`
  ${mixinFlex('row', 'space-between', 'flex-end')}
  width: 100%;
  padding: 8px 0px;
  border-bottom-width: 2px;
  border-bottom-color: ${theme.colors.core.white};
`

const StockName = styled(Text)`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const UpdatedAt = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.5);
`

const IndicatorList = styled(View)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  width: 100%;
`

const IndicatorRow = styled(View)`
  ${mixinFlex('row', 'space-between', 'center')}
  width: 100%;
  padding: 8px 0px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.1);
`

const IndicatorKeyWrapper = styled(View)`
  ${mixinFlex('row', 'flex-start', 'center')}
  gap: 4px;
`

const IndicatorKey = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const QuestionIcon = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
`

const IndicatorValue = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.core.white};
`

const ReadMoreButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: 100%;
  padding: 8px;
  background-color: ${theme.colors.background.default};
  border-radius: 8px;
`

const ReadMoreButtonText = styled(Text)`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`
const IncomeStatementContainer = styled(View)`
  margin-bottom: 24px;
`

const BalanceSheetContainer = styled(View)``
