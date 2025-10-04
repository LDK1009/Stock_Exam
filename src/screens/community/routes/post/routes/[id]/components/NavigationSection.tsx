import { usePostDetailStore } from '@/stores/screens/community/postDetail'
import { mixinFlex } from '@/styles/mixins'
import styled from '@emotion/native'
import React from 'react'
import { View } from 'react-native'
import NavigationPost from './NavigationPost'

const NavigationSection = () => {
  ///// 게시물 상세 스토어
  const { previousAndNextPostList } = usePostDetailStore()
  ///// 이전/다음 게시물 구조분해할당
  const [prevPost, nextPost] = previousAndNextPostList || []

  return (
    <Container>
      <NavigationPost post={prevPost} navigate='prev' />
      <NavigationPost post={nextPost} navigate='next' />
    </Container>
  )
}

export default NavigationSection

const Container = styled(View)`
  width: 100%;
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 8px;
`
