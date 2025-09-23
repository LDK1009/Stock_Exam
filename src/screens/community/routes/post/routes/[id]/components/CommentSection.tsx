import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { PostCommentListType, PostCommentType } from '@/types/community/postComment'
import styled from '@emotion/native'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import CommentItem from './CommentItem'

type PropsType = {
  commentList: PostCommentListType | null
}

const CommentSection = ({ commentList }: PropsType) => {
  return (
    <Container>
      <Header>
        <HeaderText>댓글</HeaderText>
      </Header>
      <CommentList>
        <FlatList
          data={commentList}
          renderItem={({ item }: { item: PostCommentType }) => (
            <CommentItem key={item.id} comment={item} />
          )}
          contentContainerStyle={{ rowGap: 16 }}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        />
      </CommentList>
    </Container>
  )
}

export default CommentSection

const Container = styled(View)`
  width: 100%;
`

const Header = styled(View)`
  ${mixinFlex('row', 'center', 'center')}

  width: 100%;
  height: 50px;
  background-color: ${theme.colors.background.paper};
`

const HeaderText = styled(Text)`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const CommentList = styled(View)`
  padding: 32px 16px;
  border: 3px solid ${theme.colors.background.paper};
  max-height: 500px;
`
