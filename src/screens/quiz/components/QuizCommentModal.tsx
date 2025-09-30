import CommonBottomSheet from '@/components/display/CommonBottomSheet'
import { useCommentDrawerStore } from '@/stores/screens/quiz/ui/commentDrawer'
import { mixinFlex } from '@/styles/mixins'
import { QuizCommentType } from '@/types/quiz/quiz_comments'
import styled from '@emotion/native'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import CommentItem from './CommentItem'
import QuizCommentInput from './QuizCommentInput'

const QuizCommentModal = () => {
  const { open, setOpen, comments, fetchComments, quizId } = useCommentDrawerStore()

  const renderItem = ({ item }: { item: QuizCommentType }) => {
    return <CommentItem comment={item} />
  }

  ////////// 모달이 열리면 댓글 가져오기
  useEffect(() => {
    if (open === true && quizId !== '') {
      fetchComments(quizId)
    }
  }, [open])

  return (
    <CommonBottomSheet visible={open} onClose={() => setOpen(false)} height={400}>
      <Container>
        <Hr />
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          nestedScrollEnabled
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ gap: 16, paddingHorizontal: 32 }}
        />
        <QuizCommentInput />
      </Container>
    </CommonBottomSheet>
  )
}

export default QuizCommentModal

const Container = styled(View)`
  ${mixinFlex('column', 'flex-start', 'center')}
  row-gap: 16px;
  flex: 1;
  width: 100%;
  padding-top: 16px;
`

const Hr = styled(View)`
  width: 200px;
  height: 3px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.3);
`
