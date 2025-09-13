import { useQuizStore } from '@/stores/screens/quiz/quiz'
import { useQuizPlayerStore } from '@/stores/screens/quiz/ui/quizPlayer'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { Dimensions, FlatList, Modal, StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Quiz from './Quiz'

const QuizPlayer = () => {
  const { open, setOpen, selectedQuizIndex } = useQuizPlayerStore()
  const { quizList } = useQuizStore()

  // 화면 높이 계산
  const { height: SCREEN_HEIGHT } = Dimensions.get('window')
  // 스테이터스바 높이 계산
  const STATUSBAR_HEIGHT = StatusBar.currentHeight || 0
  // 바텀 네비게이션 바 높이 계산
  const insets = useSafeAreaInsets()

  // 컨텐츠 높이 계산(상단 스테이터스바, 하단 바텀 네비게이션 바 제외)
  const CONTENT_HEIGHT = SCREEN_HEIGHT - STATUSBAR_HEIGHT - insets.bottom

  return (
    <Modal visible={open} transparent animationType='fade' onRequestClose={() => setOpen(false)}>
      <ModalContainer>
        <FlatList
          // 렌더링 관련
          data={quizList}
          renderItem={({ item: quizData, index }) => (
            <QuizContainer height={CONTENT_HEIGHT}>
              <Quiz quiz={quizData} index={index} />
            </QuizContainer>
          )}
          // 페이징 관련
          pagingEnabled={true}
          decelerationRate={'normal'}
          // 스크롭바 표시 관련
          showsVerticalScrollIndicator={false}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50, // 50% 이상 보일 때 visible로 간주
          }}
          contentContainerStyle={{ flexGrow: 1 }} // 이걸 제거해보세요
          // 시작할 아이템 인덱스
          initialScrollIndex={selectedQuizIndex}
          // 아이템 크기/위치 정보
          getItemLayout={(_, index) => ({
            length: CONTENT_HEIGHT, // 각 아이템이 차지하는 실제 높이
            offset: CONTENT_HEIGHT * index, // 이전 아이템들의 높이 합
            index,
          })}
        />
      </ModalContainer>
    </Modal>
  )
}

export default QuizPlayer

const ModalContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  position: relative;
  flex: 1;
  background-color: ${theme.colors.background.default};
  z-index: ${theme.zIndices.modal};
`

type QuizContainerProps = {
  height: number
}

const QuizContainer = styled(View)<QuizContainerProps>`
  height: ${({ height }) => `${height}px`};
  ${mixinFlex('column', 'center', 'center')}
  border: 1px solid blue;
`
