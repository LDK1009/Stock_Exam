import { mixinFlex } from '@/styles/mixins'
import { PostType } from '@/types/community/community'
import styled from '@emotion/native'
import React from 'react'
import { View } from 'react-native'
import NavigationPost from './NavigationPost'

const NavigationSection = () => {
  const examplePost: PostType = {
    title: 'ETF와 개별주식, 어디에 투자하는 게 나을까? 고민이네요 정말',
    category: '자유게시판',
    content: 'Example Content',
    viewCount: 100,
    commentCount: 10,
    recommendationCount: 5,
  }

  return (
    <Container>
      <NavigationPost post={examplePost} navigate='prev' />
      <NavigationPost post={examplePost} navigate='next' />
    </Container>
  )
}

export default NavigationSection

const Container = styled(View)`
  width: 100%;
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 8px;
`
