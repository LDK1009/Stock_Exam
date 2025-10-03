import { isAuthenticated } from '@/services/auth/auth'
import { createQuizLike, deleteQuizLike } from '@/services/tables/quiz/quiz_likes'
import { useConfirmModalStore } from '@/stores/common/modal'
import { useActionBarStore } from '@/stores/screens/quiz/ui/actionBar'
import { useCommentDrawerStore } from '@/stores/screens/quiz/ui/commentDrawer'
import { useQuizPlayerStore } from '@/stores/screens/quiz/ui/quizPlayer'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizStatsType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  quizId: number
  quiz_stats: QuizStatsType
}

const QuizDetailActionBar = ({ quizId, quiz_stats }: PropsType) => {
  const { userLikedList, addUserLikedList, removeUserLikedList } = useActionBarStore()
  const { setOpen: setOpenCommentDrawer, fetchComments, setQuizId } = useCommentDrawerStore()
  const { setConfirmLogin, setEventCallback } = useConfirmModalStore()
  const { setOpen: setOpenQuizPlayer } = useQuizPlayerStore()

  const { likeCount, commentCount } = quiz_stats

  async function handleLikePress(isLiked: boolean) {
    const isUserAuthenticated = await isAuthenticated()

    if (!isUserAuthenticated) {
      setEventCallback({
        onConfirmCallback: () => {
          setOpenQuizPlayer(false)
        },
        onCancelCallback: () => {},
      })
      setConfirmLogin('좋아요를 남기려면 로그인이 필요합니다.')
      return
    }

    if (isLiked) {
      removeUserLikedList(quizId)
      await deleteQuizLike(quizId)
    } else {
      addUserLikedList(quizId)
      await createQuizLike(quizId)
    }
  }

  async function handleCommentPress() {
    setOpenCommentDrawer(true)
    setQuizId(quizId)
  }

  const isLiked = userLikedList.includes(quizId)

  return (
    <Container>
      <ActionContainer onPress={() => handleLikePress(isLiked)}>
        {isLiked ? (
          <FontAwesome name='heart' size={20} color='white' />
        ) : (
          <FontAwesome name='heart-o' size={20} color='white' />
        )}
        <ActionText>{isLiked ? likeCount + 1 : likeCount}</ActionText>
      </ActionContainer>
      <ActionContainer onPress={handleCommentPress}>
        <Ionicons name='chatbubble-outline' size={20} color={theme.colors.core.white} />
        <ActionText>{commentCount}</ActionText>
      </ActionContainer>
    </Container>
  )
}

export default QuizDetailActionBar

const Container = styled(View)`
  ${mixinFlex('row', 'flex-end', 'center')}
  column-gap: 16px;
  width: 100%;
`

const ActionContainer = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 4px;
`

const ActionText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: 400;
  color: ${theme.colors.core.white};
`
