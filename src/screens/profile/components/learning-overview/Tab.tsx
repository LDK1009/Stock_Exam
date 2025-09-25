import { useLearningOverviewStore } from '@/stores/screens/profile/learningOverview'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Tab = () => {
  const { tab, setTab } = useLearningOverviewStore()
  return (
    <Container>
      <TabItem isSelected={tab === '맞춘 문제'} onPress={() => setTab('맞춘 문제')}>
        <TabText isSelected={tab === '맞춘 문제'}>맞춘 문제</TabText>
      </TabItem>
      <TabItem isSelected={tab === '틀린 문제'} onPress={() => setTab('틀린 문제')}>
        <TabText isSelected={tab === '틀린 문제'}>틀린 문제</TabText>
      </TabItem>
    </Container>
  )
}

export default Tab

const Container = styled(View)`
  width: 100%;
  ${mixinFlex('row', 'center', 'center')}
`

type TabItemProps = {
  isSelected: boolean
}

const TabItem = styled(TouchableOpacity)<TabItemProps>`
  ${mixinFlex('column', 'center', 'center')}
  flex:1;
  padding: 4px;
  border-bottom-width: ${({ isSelected }) => (isSelected ? '2px' : '1px')};
  border-bottom-color: ${({ isSelected }) =>
    isSelected ? theme.colors.core.white : 'rgba(255, 255, 255, 0.3)'};
`

type TabTextProps = {
  isSelected: boolean
}

const TabText = styled(Text)<TabTextProps>`
  font-size: ${theme.fontSizes.subtitle};
  font-weight: ${theme.fontWeights.bold};
  color: ${({ isSelected }) => (isSelected ? theme.colors.core.white : 'rgba(255, 255, 255, 0.5)')};
`
