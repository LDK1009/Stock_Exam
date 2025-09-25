import { useLearningOverviewStore } from '@/stores/screens/profile/learningOverview'
import { mixinFlex } from '@/styles/mixins'
import styled from '@emotion/native'
import React from 'react'
import { View } from 'react-native'
import LearningOverviePieChart from './LearningOverviePieChart'
import ReadMoreButton from './ReadMoreButton'
import Tab from './Tab'

const LearningOverviewSection = () => {
  const { tab } = useLearningOverviewStore()
  return (
    <Container>
      <Tab />
      {tab === '맞춘 문제' && <LearningOverviePieChart />}
      {tab === '틀린 문제' && <LearningOverviePieChart />}
      <ReadMoreButton />
    </Container>
  )
}

export default LearningOverviewSection

const Container = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  row-gap: 16px;
  width: 100%;
`
