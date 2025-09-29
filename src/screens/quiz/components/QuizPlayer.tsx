import CommonToast from '@/components/feedback/CommonToast'
import { incrementQuizViewCount } from '@/services/tables/quiz_stats'
import { useQuizFilterStore } from '@/stores/screens/quiz/filter'
import { useQuizStore } from '@/stores/screens/quiz/quiz'
import { useQuizPlayerStore } from '@/stores/screens/quiz/ui/quizPlayer'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import React, { useCallback, useRef } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  StatusBar,
  View,
  ViewToken,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import QuizDetail from './QuizDetail'
import QuizDetailActionBar from './QuizDetailActionBar'
import ScrollAnimation from './ScrollAnimation'

const QuizPlayer = () => {
  const { open, setOpen, selectedQuizIndex } = useQuizPlayerStore()
  const { quizList, getQuiz, loading, canMore, page, setPage } = useQuizStore()
  const { searchValue, category, difficulty, type, sort } = useQuizFilterStore()

  // 화면 높이 계산
  const { height: SCREEN_HEIGHT } = Dimensions.get('window')
  // 스테이터스바 높이 계산
  const STATUSBAR_HEIGHT = StatusBar.currentHeight || 0
  // 바텀 네비게이션 바 높이 계산
  const insets = useSafeAreaInsets()

  // 컨텐츠 높이 계산(상단 스테이터스바, 하단 바텀 네비게이션 바 제외)
  const CONTENT_HEIGHT = SCREEN_HEIGHT - STATUSBAR_HEIGHT - insets.bottom

  // viewability 설정을 useRef로 메모이제이션
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  }).current

  ////////// 무한 스크롤
  const loadMore = useCallback(() => {
    // 로딩 중이거나 더 불러올 데이터가 없으면 중단
    if (!loading && canMore) {
      const nextPage = page + 1
      setPage(nextPage)
      getQuiz(nextPage, searchValue, category, difficulty, type, sort)
    }
  }, [loading, canMore, page, searchValue, category, difficulty, type, sort])

  // 보이는 아이템 변경 핸들러를 useCallback으로 메모이제이션
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const currentIndex = viewableItems[0].index as number
        const currentQuiz = quizList[currentIndex]

        // 조회수 증가
        if (currentQuiz?.id) {
          incrementQuizViewCount(currentQuiz.id.toString())
        }

        // 마지막에서 두 번째 퀴즈에 도달하면 추가 퀴즈 로드
        if (currentIndex === quizList.length - 2) {
          loadMore()
        }
      }
    },
    [quizList, loadMore]
  )

  type RenderItemProps = {
    item: QuizType
    index: number
  }

  // renderItem도 useCallback으로 메모이제이션
  const renderItem = useCallback(
    ({ item: quizData, index }: RenderItemProps) => (
      <QuizContainer height={CONTENT_HEIGHT}>
        <QuizDetail quiz={quizData} />
        {quizData.id && (
          <QuizDetailActionBar
            quiz_stats={quizData.quiz_stats || { viewCount: 0, likeCount: 0, commentCount: 0 }}
          />
        )}
      </QuizContainer>
    ),
    [CONTENT_HEIGHT]
  )

  // getItemLayout도 useCallback으로 메모이제이션
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: CONTENT_HEIGHT,
      offset: CONTENT_HEIGHT * index,
      index,
    }),
    [CONTENT_HEIGHT]
  )

  return (
    <Modal visible={open} transparent animationType='fade' onRequestClose={() => setOpen(false)}>
      <ModalContainer>
        <FlatList
          ///// 렌더링 관련
          // 렌더링할 배열
          data={quizList}
          // 렌더링할 아이템 컴포넌트
          renderItem={renderItem}
          ///// 페이징 관련
          // 페이징 사용 여부
          pagingEnabled={true}
          // 페이징 감속 설정
          decelerationRate={'normal'}
          // 시작할 아이템 인덱스
          initialScrollIndex={selectedQuizIndex}
          // 아이템 크기/위치 정보
          getItemLayout={getItemLayout}
          ///// 뷰 트래킹 관련
          // 뷰 트래킹 판단 기준 설정
          viewabilityConfig={viewabilityConfig}
          // 보이는 아이템 변경 핸들러
          onViewableItemsChanged={onViewableItemsChanged}
          ///// 성능 최적화 관련
          removeClippedSubviews={true} // 화면 밖 아이템 메모리에서 제거
          maxToRenderPerBatch={3} // 한번에 렌더링할 아이템 수 제한
          ///// 기타
          // 스크롤바 숨김 여부
          showsVerticalScrollIndicator={false} // 스크롤바 숨기기
          ListFooterComponent={
            loading ? (
              <LoadingContainer>
                <ActivityIndicator size='large' color={theme.colors.core.white} animating={true} />
              </LoadingContainer>
            ) : null
          }
        />
        <ScrollAnimation />
        <CommonToast />
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
  ${mixinFlex('column', 'center', 'center')}
  height: ${({ height }) => `${height}px`};
  padding: 32px;
  row-gap: 16px;
`

const LoadingContainer = styled(View)`
  padding: 20px;
  align-items: center;
`
