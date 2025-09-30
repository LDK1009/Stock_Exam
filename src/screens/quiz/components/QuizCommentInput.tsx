import { getUserId, isAuthenticated } from '@/services/auth/auth'
import { createQuizComment } from '@/services/tables/quiz_comments'
import { useConfirmModalStore } from '@/stores/common/modal'
import { useCommentDrawerStore } from '@/stores/screens/quiz/ui/commentDrawer'
import { useQuizPlayerStore } from '@/stores/screens/quiz/ui/quizPlayer'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { generateRandomId } from '@/utils/random'
import styled from '@emotion/native'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
// import { v4 as uuidv4 } from 'uuid' // 임시 제거

const QuizCommentInput = () => {
  const {
    setOpen: setOpenCommentDrawer,
    inputComment,
    setInputComment,
    quizId,
    clearInputComment,
    addComments,
  } = useCommentDrawerStore()
  const { setOpen: setOpenQuizPlayer } = useQuizPlayerStore()
  const { setConfirmLogin, setEventCallback } = useConfirmModalStore()

  ////////// 댓글 보내기 핸들러
  async function handleSendPress() {
    // 댓글 입력값이 없으면 종료
    if (!inputComment) {
      return
    }

    // 로그인 여부 확인
    const isUserAuthenticated = await isAuthenticated()
    // 유저 ID 가져오기
    const userId = await getUserId()

    // 비로그인 상태면 로그인 컨펌 모달 열기
    if (!isUserAuthenticated || !userId) {
      setEventCallback({
        onConfirmCallback: () => {
          setOpenCommentDrawer(false)
          setOpenQuizPlayer(false)
        },
        onCancelCallback: () => {},
      })
      setConfirmLogin('댓글을 남기려면 로그인이 필요합니다.')
      return
    }

    // 랜덤 ID 생성
    const randomId = generateRandomId()

    // 댓글 상태 추가
    addComments({
      id: randomId,
      quizId: quizId.toString(), // number를 string으로 변환
      userId: userId,
      content: inputComment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    // 댓글 데이터베이스 추가
    await createQuizComment({
      quizId: quizId.toString(), // number를 string으로 변환
      userId: userId,
      content: inputComment,
    })

    // 댓글 입력값 초기화
    clearInputComment()
  }

  return (
    <Container>
      <InputContainer>
        <StyleTextInput
          value={inputComment}
          onChangeText={setInputComment}
          placeholder='댓글 추가...'
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          multiline
          numberOfLines={3}
          textAlignVertical='top'
        />
        <SendButton onPress={handleSendPress}>
          <Feather name='send' size={18} color={'rgba(255, 255, 255, 0.5)'} />
        </SendButton>
      </InputContainer>
    </Container>
  )
}

export default QuizCommentInput

const Container = styled(View)`
  ${mixinFlex('column', 'center', 'center')}

  width: 100%;
  padding: 16px;

  background-color: #333333;
`

const InputContainer = styled(View)`
  ${mixinFlex('row', 'space-between', 'center')}
  column-gap: 16px;

  width: 100%;
  padding: 8px 16px;

  border-radius: 999px;
  background-color: ${theme.colors.background.paper};
`

const StyleTextInput = styled(TextInput)`
  flex: 1;
  height: 100%;
  font-size: ${theme.fontSizes.body}px;
  color: ${theme.colors.core.white};
`

const SendButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: 30px;
  height: 30px;

  padding-top: 2px;
  padding-right: 2px;

  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 100%;
`
