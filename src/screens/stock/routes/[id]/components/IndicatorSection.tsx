import { getSummaryFinancialStatements } from '@/services/api/public-data-portal/stock'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { StockType } from '@/types/stock/stock'
import { formatKoreanCurrency } from '@/utils/number'
import styled from '@emotion/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  stock: StockType
}
const IndicatorSection = ({ stock }: PropsType) => {
  const indicators = [
    {
      key: 'PER',
      value: `${11.2} 배`,
    },
    {
      key: 'PBR',
      value: `${1.3} 배`,
    },
    {
      key: 'ROE',
      value: `${12.5} %`,
    },
    {
      key: '매출액',
      value: `${formatKoreanCurrency(310000000000000)}원`,
    },
    {
      key: '부채비율',
      value: `${45} %`,
    },
  ]


  async function testFunction() {
    const summaryFinancialStatements = await getSummaryFinancialStatements(stock.id)
    console.log('요약 재무제표', JSON.stringify(summaryFinancialStatements, null, 2))
  }


  testFunction()

  return (
    <Container>
      <Header>
        <StockName>{stock.name}</StockName>
        <UpdatedAt>2025.09.21</UpdatedAt>
      </Header>
      <IndicatorList>
        {indicators.map((indicator) => (
          <IndicatorRow key={indicator.key}>
            <IndicatorKey>{indicator.key}</IndicatorKey>
            <IndicatorValue>{indicator.value}</IndicatorValue>
          </IndicatorRow>
        ))}
      </IndicatorList>
      <ReadMoreButton>
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

const IndicatorKey = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
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
