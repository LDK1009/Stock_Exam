import CommonLoading from '@/components/feedback/CommonLoading'
import { getPostById } from '@/services/tables/posts'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { PostType } from '@/types/community/community'
import styled from '@emotion/native'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import PostSection from './components/PostSection'

const PostDetailScreen = () => {
  const { id } = useLocalSearchParams()

  const [postDeatil, setPostDeatil] = useState<PostType | null>(null)

  async function fetchPostDetail() {
    if (id && typeof id === 'string') {
      const response = await getPostById(id)
      setPostDeatil(response.data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPostDetail()
    }, [])
  )

  if (!postDeatil) {
    return (
      <Container>
        <CommonLoading />
      </Container>
    )
  }

  return (
    <Container>
      <PostSection post={postDeatil} />
    </Container>
  )
}

export default PostDetailScreen

const Container = styled(View)`
  flex: 1;
  padding: 32px 16px;

  ${mixinFlex('column', 'flex-start', 'center')}
  row-gap: 48px;

  padding-bottom: 50px;
  background-color: ${theme.colors.background.default};
`
