import { isAuthenticated } from '@/services/auth/auth'
import { createQuizLike, deleteQuizLike } from '@/services/tables/quiz_likes'
import { useConfirmModalStore } from '@/stores/common/modal'
import { useActionBarStore } from '@/stores/screens/quiz/ui/actionBar'
import { useCommentDrawerStore } from '@/stores/screens/quiz/ui/commentDrawer'
import { useQuizPlayerStore } from '@/stores/screens/quiz/ui/quizPlayer'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizStatsType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  quizId: number
  quiz_stats: QuizStatsType
}

const QuizDetailActionBar = ({ quizId, quiz_stats }: PropsType) => {
  const { userLikedList, addUserLikedList, removeUserLikedList } = useActionBarStore()
  const { setOpen: setOpenCommentDrawer } = useCommentDrawerStore()
  const { setOpen, setContent, setEvent } = useConfirmModalStore()
  const { setOpen: setOpenQuizPlayer } = useQuizPlayerStore()

  const { likeCount, commentCount } = quiz_stats

  ///// 좋아요 터치 핸들러
  async function handleLikePress(isLiked: boolean) {
    // 로그인 여부 확인
    const isUserAuthenticated = await isAuthenticated()

    // 비로그인 상태면 로그인 컨펌 모달 열기
    if (!isUserAuthenticated) {
      setOpen(true)
      setContent(
        '로그인이 필요한 기능입니다.',
        '좋아요를 남기려면 로그인이 필요해요',
        '확인',
        '취소'
      )
      setEvent(
        () => {
          setOpenQuizPlayer(false) // 퀴즈 플레이어 모달 닫기
          router.push('/auth/login')
        },
        () => setOpen(false)
      )
      return
    }

    // 기존에 좋아요 눌렀는지 여부
    if (isLiked) {
      // 좋아요 삭제
      removeUserLikedList(quizId)
      await deleteQuizLike(quizId)
    } else {
      // 좋아요 추가
      addUserLikedList(quizId)
      await createQuizLike(quizId)
    }
  }

  ///// 댓글 터치 핸들러
  async function handleCommentPress() {
    setOpenCommentDrawer(true)
  }

  ///// 좋아요 여부
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
