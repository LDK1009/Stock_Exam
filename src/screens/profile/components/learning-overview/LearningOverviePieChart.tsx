import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

const LearningOverviePieChart = () => {
  const data = [
    {
      name: '재무제표',
      count: 70,
      color: theme.colors.status.info,
    },
    {
      name: '손익계산서',
      count: 20,
      color: '#55FFDD',
    },
    {
      name: '그 외',
      count: 10,
      color: theme.colors.background.paper,
    },
  ]

  return (
    <PieChartContainer>
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
      <LegendContainer>
        {data.map((item, index) => (
          <LegendItem key={`${item.name}-${index}`}>
            <LegendCircle rank={index} />
            <LegendText>{item.name}</LegendText>
          </LegendItem>
        ))}
      </LegendContainer>
    </PieChartContainer>
  )
}

export default LearningOverviePieChart

const PieChartContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  padding: 16px 0px;
  row-gap: 16px;
  width: 100%;
`

const LegendContainer = styled(View)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 16px;
  width: 100%;
`

const LegendItem = styled(View)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 8px;
`

type LegendCircleProps = {
  rank: number
}

const LegendCircle = styled(View)<LegendCircleProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ rank }) => {
    if (rank === 0) {
      return `${theme.colors.status.info}`
    }
    if (rank === 1) {
      return `${theme.colors.status.success}`
    }
    if (rank === 2) {
      return `${theme.colors.background.paper}`
    }
  }};
`

const LegendText = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`
