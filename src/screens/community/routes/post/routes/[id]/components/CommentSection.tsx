import { theme } from '@/styles/theme'
import { PostCommentListType } from '@/types/community/postComment'
import styled from '@emotion/native'
import React from 'react'
import { Text, View } from 'react-native'

type PropsType = {
  commentList: PostCommentListType | null
}

const CommentSection = ({ commentList }: PropsType) => {
  return (
    <Container>
      <Text>CommentSection</Text>
    </Container>
  )
}

export default CommentSection


const Container = styled(View)`
  width: 100%;
  background-color: ${theme.colors.background.paper};
`
