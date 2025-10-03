import { useLearningOverviewStore } from '@/stores/screens/profile/learningOverview'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Text, View } from 'react-native'
import LearningOverviePieChart from './LearningOverviePieChart'
import ReadMoreButton from './ReadMoreButton'
import Tab from './Tab'

const LearningOverviewSection = () => {
  ///// 스토어
  const { tab } = useLearningOverviewStore()

  return (
    <Container>
      {/* 탭 버튼*/}
      <Tab />
      {/* 파이 차트 */}
      {tab === '맞춘 문제' && <LearningOverviePieChart />}
      {/* 파이 차트 */}
      {tab === '틀린 문제' && <LearningOverviePieChart />}
      {/* 자세히 보기 버튼 */}
      <ReadMoreButton />

      {/* 준비중인 기능 레이어 */}
      <CommingSoonLayer>
        <CommingSoonText>학습 리포트가 곧 제공됩니다.</CommingSoonText>
        <CommingSoonSubText>정답 비율, 약점 분석 등을 확인할 수 있어요!</CommingSoonSubText>
      </CommingSoonLayer>
    </Container>
  )
}

export default LearningOverviewSection

const Container = styled(View)`
  position: relative;
  ${mixinFlex('column', 'center', 'center')}
  row-gap: 16px;
  width: 100%;
`

const CommingSoonLayer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  row-gap: 8px;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`

const CommingSoonText = styled(Text)`
  font-size: ${`${theme.fontSizes.title}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const CommingSoonSubText = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.core.white};
`
