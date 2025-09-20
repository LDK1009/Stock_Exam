import Quiz from '@/screens/quiz/components/Quiz'
import { useQuizStore } from '@/stores/screens/quiz/quiz'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

const QuizSection = () => {
  const { quizList } = useQuizStore()

  type RenderItemProps = {
    item: QuizType
    index: number
  }

  const QuizWidth = 300
  const QuizGap = 16
  const TotalWidth = QuizWidth * quizList.length + QuizGap * (quizList.length - 1)

  const renderItem = useCallback(
    ({ item: quizData, index }: RenderItemProps) => (
      <QuizContainer>
        <Quiz quiz={quizData} index={index} />
      </QuizContainer>
    ),
    [TotalWidth]
  )

  return (
    <Container>
      <FlatListContainer>
        <FlatList
          ///// 렌더링 관련
          // 렌더링할 배열
          data={quizList}
          horizontal
          // 렌더링할 아이템 컴포넌트
          renderItem={renderItem}
          ///// 페이징 관련
          snapToInterval={316} // 316px 단위로 스냅
          snapToAlignment='start'
          decelerationRate='fast'
          ///// 뷰 트래킹 관련
          ///// 성능 최적화 관련
          removeClippedSubviews={true} // 화면 밖 아이템 메모리에서 제거
          maxToRenderPerBatch={3} // 한번에 렌더링할 아이템 수 제한
          ///// 기타
          // 스크롤바 숨김 여부
          showsVerticalScrollIndicator={false} // 스크롤바 숨기기
          // 컨텐츠 컨테이너 스타일
          contentContainerStyle={{ gap: 16 }}
        />
      </FlatListContainer>
      {/* 버튼 */}
      <QuizCreateButton>
        <MaterialIcons name='quiz' size={24} color='#FFFFFF' />
        <QuizCreateButtonText>문제 만들기</QuizCreateButtonText>
      </QuizCreateButton>
    </Container>
  )
}

export default QuizSection

const Container = styled(View)`
  width: 100%;
  ${mixinFlex('column', 'flex-start', 'center')}
`

const FlatListContainer = styled(View)`
  height: 120px;
`

const QuizContainer = styled(View)`
  width: 300px;
`

const QuizCreateButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 4px;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  padding: 8px;
  background-color: ${theme.colors.background.paper};
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const QuizCreateButtonText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`
