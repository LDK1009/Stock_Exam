import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { StockType } from '@/types/stock/stock'
import { formatFluctuationRate, formatKoreanCurrency } from '@/utils/number'
import styled from '@emotion/native'
import React from 'react'
import { Text, View } from 'react-native'

type StockItemProps = {
  stock: StockType
}

const StockItem = ({ stock }: StockItemProps) => {
  // 퀴즈 개수
  const quizCount = Math.floor(Math.random() * 10)
  // 퀴즈 성공 개수
  const quizSuccessCount = Math.floor(Math.random() * 10)

  return (
    <Container>
      <StockInfo>
        {/* 종목명 */}
        <StockName>{stock.name}</StockName>
        {/* 종가, 등락률, 시가총액 */}
        <StockPriceContainer>
          <StockPrice>{formatKoreanCurrency(stock.closingPrice)} </StockPrice>
          <StockFluctuationRate direction={stock.fluctuationRate > 0 ? 'up' : 'down'}>
            ({stock.fluctuationRate > 0 ? '+' : ''}
            {formatFluctuationRate(stock.fluctuationRate)}%){' '}
          </StockFluctuationRate>
          <StockMarketCapitalization>
            • {formatKoreanCurrency(stock.marketCapitalization)}
          </StockMarketCapitalization>
        </StockPriceContainer>
      </StockInfo>
      <QuizContainer>
        <QuizCountBox>
          <QuizSuccessRatioBox ratio={quizSuccessCount / quizCount} />
          {quizSuccessCount === quizCount ? (
            <QuizCountText>🎓</QuizCountText>
          ) : (
            <QuizCountText>{quizCount}</QuizCountText>
          )}
        </QuizCountBox>
      </QuizContainer>
    </Container>
  )
}

export default StockItem

const Container = styled(View)`
  width: 100%;
  padding: 16px;
  ${mixinFlex('row', 'space-between', 'center')}
  background-color: ${theme.colors.background.paper};
  border-radius: 16px;
`

const StockInfo = styled(View)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 4px;
`

const StockName = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
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

const QuizContainer = styled(View)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 4px;
`

const QuizCountBox = styled(View)`
  position: relative;
  ${mixinFlex('column', 'center', 'center')}
  width: 32px;
  height: 32px;
  background-color: #111111;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  overflow: hidden;
`

const QuizCountText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

type QuizSuccessRatioBoxProps = {
  ratio: number
}

const QuizSuccessRatioBox = styled(View)<QuizSuccessRatioBoxProps>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: ${({ ratio }) => `${ratio * 100}%`};
  background-color: rgba(255, 255, 255, 0.5);
`
