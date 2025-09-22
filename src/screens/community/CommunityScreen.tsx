import { mixinContainer, mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { View } from 'react-native'
import CategoryBar from './components/CategoryBar'
import CreatePostButton from './components/CreatePostButton'
import PostList from './components/PostList'

const CommunityScreen = () => {
  return (
    <Container>
      <CategoryBar />
      <PostArea>
        <PostList />
        <CreatePostButton />
      </PostArea>
    </Container>
  )
}

export default CommunityScreen

const Container = styled(View)`
  ${mixinContainer}
  ${mixinFlex('column', 'flex-start', 'center')}
  padding: 32px 16px;
  padding-bottom: 0px;
  row-gap: 24px;
  background-color: ${theme.colors.background.default};
`

const PostArea = styled(View)`
  width: 100%;
  flex: 1;
`
