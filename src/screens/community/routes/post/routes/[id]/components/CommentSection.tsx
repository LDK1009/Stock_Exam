import CommonText from '@/components/display/CommonText'
import { usePostDetailStore } from '@/stores/screens/community/postDetail'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import CommentInputBar from './CommentInputBar'
import CommentItem from './CommentItem'

const CommentSection = () => {
  const { postId, comments } = usePostDetailStore()

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <HeaderText>댓글</HeaderText>
      </Header>
      {/* 댓글 목록 */}
      <CommentList>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          contentContainerStyle={{ gap: 16 }}
        >
          {comments?.length === 0 ? (
            <CommonText>첫 댓글을 남겨보세요.</CommonText>
          ) : (
            <>
              {comments?.map((item) => (
                <CommentItem key={item.id} comment={item} />
              ))}
            </>
          )}
        </ScrollView>
      </CommentList>
      {/* 댓글 입력바 */}
      <CommentInputBar />
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
