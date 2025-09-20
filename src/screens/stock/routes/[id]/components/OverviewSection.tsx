import CommonText from '@/components/display/CommonText'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { StockType } from '@/types/stock/stock'
import {
  formatFluctuationRate,
  formatKoreanCurrency,
  formatThousandSeparator,
} from '@/utils/number'
import styled from '@emotion/native'
import React from 'react'
import { Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

type PropsType = {
  stock: StockType
}

const OverviewSection = ({ stock }: PropsType) => {
  console.log(stock)

  const data = [
    {
      name: '완료',
      count: 100,
      color: 'rgba(255, 255, 255, 0.5)',
    },
    {
      name: '미완료',
      count: 70,
      color: '#111111',
    },
  ]

  return (
    <Container>
      {/* 종목 관련 정보 */}
      <StockInfoContainer>
        <CommonText>{stock?.name || ''}</CommonText>
        <StockPriceContainer>
          <StockPrice>{formatThousandSeparator(stock.closingPrice)}원 </StockPrice>
          <StockFluctuationRate direction={stock.fluctuationRate > 0 ? 'up' : 'down'}>
            ({stock.fluctuationRate > 0 ? '+' : ''}
            {formatFluctuationRate(stock.fluctuationRate)}%){' '}
          </StockFluctuationRate>
          <StockMarketCapitalization>
            • {formatKoreanCurrency(stock.marketCapitalization)}
          </StockMarketCapitalization>
        </StockPriceContainer>
      </StockInfoContainer>

      {/* 퀴즈 관련 정보 */}
      <QuizInfoContainer>
        {/* 테이블 */}
        <QuizstatisticsTable>
          <QuizstatisticsTableRow>
            <TableBasicText>전체 문제</TableBasicText>
            <TableBasicText>32</TableBasicText>
          </QuizstatisticsTableRow>
          <QuizstatisticsTableRow
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255, 255, 255, 0.7)',
              paddingBottom: 8,
            }}
          >
            <TableBasicText>푼 문제</TableBasicText>
            <TableBasicText>16</TableBasicText>
          </QuizstatisticsTableRow>
          <QuizstatisticsTableRow>
            <TableStrongText>남은 문제</TableStrongText>
            <TableStrongText>16</TableStrongText>
          </QuizstatisticsTableRow>
        </QuizstatisticsTable>
        {/* 파이차트 */}
        <PieChartContainer>
          <CenterText>32</CenterText>
          <PieChart
            data={data}
            width={125}
            height={125}
            paddingLeft='0'
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor='count'
            backgroundColor='transparent'
            center={[30, 0]} // 중앙 정렬
            hasLegend={false}
          />
        </PieChartContainer>
      </QuizInfoContainer>
    </Container>
  )
}

export default OverviewSection

const Container = styled(View)`
  ${mixinFlex('column', 'flex-start', 'center')}
  width: 100%;
  background-color: ${theme.colors.background.paper};
  padding: 16px;
  row-gap: 16px;
  border-radius: 16px;
`

const StockInfoContainer = styled(View)`
  ${mixinFlex('column', 'flex-start', 'center')}
  row-gap: 4px;
`

const StockPriceContainer = styled(Text)``

const StockPrice = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.core.white};
`

type StockFluctuationRateProps = {
  direction: 'up' | 'down'
}

const StockFluctuationRate = styled(Text)<StockFluctuationRateProps>`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${({ direction }) => (direction === 'up' ? '#F04251' : '#3485FA')};
`

const StockMarketCapitalization = styled(Text)`
  font-size: 10px;
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.7);
`

const QuizInfoContainer = styled(View)`
  ${mixinFlex('row', 'flex-start', 'center')}
  column-gap: 32px;
  padding: 0px 32px;
`

const QuizstatisticsTable = styled(View)`
  ${mixinFlex('column', 'flex-start', 'center')}
  flex:1;
  row-gap: 8px;
`

const QuizstatisticsTableRow = styled(View)`
  ${mixinFlex('row', 'space-between', 'center')}
  width: 100%;
`

const TableBasicText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.7);
`

const TableStrongText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const PieChartContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  overflow: hidden;
`

const CenterText = styled(Text)`
  position: absolute;
  z-index: 1; // 차트 위에 표시되도록

  font-size: 20px;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`
