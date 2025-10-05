import CommonToast from '@/components/feedback/CommonToast'
import { incrementQuizViewCount } from '@/services/tables/quiz/quiz_stats'
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
import QuizCommentModal from './QuizCommentModal'
import QuizDetail from './QuizDetail'
import QuizDetailActionBar from './QuizDetailActionBar'
import ScrollAnimation from './ScrollAnimation'

const QuizPlayer = () => {
  ///// 퀴즈 플레이어 스토어
  const { open, setOpen, selectedQuizIndex } = useQuizPlayerStore()
  ///// 퀴즈 스토어
  const { quizList, getQuiz, loading, canMore, page, setPage } = useQuizStore()
  ///// 퀴즈 필터 스토어
  const { searchValue, category, difficulty, type, sort } = useQuizFilterStore()

  // 화면 총 높이 추출
  const { height: SCREEN_HEIGHT } = Dimensions.get('window')
  // 스테이터스바 높이 추출
  const STATUSBAR_HEIGHT = StatusBar.currentHeight || 0
  // 바텀 네비게이션 바 높이 추출
  const insets = useSafeAreaInsets()
  // 최종 컨텐츠 영역 높이 계산(컨텐츠 영역 높이 = 화면 높이 - (상단 스테이터스바 + 하단 바텀 네비게이션 바))
  const CONTENT_HEIGHT = SCREEN_HEIGHT - STATUSBAR_HEIGHT - insets.bottom

  ///// FlatList 참조 추가
  const flatListRef = useRef<FlatList>(null)

  ///// 뷰트래킹 옵션(70% 이상 보이면 뷰트래킹 판단)
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

  ///// 뷰트래킹 핸들러
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        // 현재 보이는 퀴즈 인덱스 추출
        const currentIndex = viewableItems[0].index as number
        // 현재 보이는 퀴즈 데이터 추출
        const currentQuizId = quizList[currentIndex].id


        console.log("--------------------------------")
        console.log('현재 보이는 퀴즈 인덱스 : ', currentIndex)
        console.log('현재 보이는 퀴즈 아이디 : ', currentQuizId)
        console.log("--------------------------------")

        // 현재 보이는 퀴즈 아이디가 있으면 조회수 증가
        if (currentQuizId) {
          incrementQuizViewCount(currentQuizId)
        }

        // 마지막 문제에 가까워지면 추가 퀴즈 로드
        if (currentIndex === quizList.length - 2) {
          loadMore()
        }
      }
    },
    [quizList, loadMore]
  )

  ///// 렌더링 핸들러
  type RenderItemProps = {
    item: QuizType
    index: number
  }

  ///// 렌더링 핸들러
  const renderItem = ({ item: quizData, index }: RenderItemProps) => {
    return (
      <QuizContainer height={CONTENT_HEIGHT}>
        {/* 퀴즈 상세 */}
        <QuizDetail quiz={quizData} />
        {/* 액션바 */}
        {quizData.id && (
          <QuizDetailActionBar
            quizId={quizData.id}
            quiz_stats={quizData.quiz_stats || { viewCount: 0, likeCount: 0, commentCount: 0 }}
          />
        )}
      </QuizContainer>
    )
  }

  ///// 아이템 레이아웃 추출 핸들러
  const getItemLayout = (_: any, index: number) => ({
    length: CONTENT_HEIGHT,
    offset: CONTENT_HEIGHT * index,
    index,
  })

  ////////////////////////////// 임시코드
  const onScrollToIndexFailed = useCallback((info: any) => {
    // setTimeout(() => {
    //   flatListRef.current?.scrollToIndex({
    //     index: info.index,
    //     animated: false,
    //   })
    // }, 100)
  }, [])
  ////////////////////////////// 임시코드

  return (
    <Modal visible={open} transparent animationType='fade' onRequestClose={() => setOpen(false)}>
      <ModalContainer>
        <FlatList
          ref={flatListRef}
          ///// 렌더링 관련
          // 렌더링할 배열
          data={quizList}
          // 렌더링할 아이템 컴포넌트
          renderItem={renderItem}
          ///// 페이징 관련
          // 한번에 스냅할 간격
          snapToInterval={CONTENT_HEIGHT}
          // 스냅 정렬 방식
          snapToAlignment='start'
          // 감속 속도
          decelerationRate={'fast'}
          // 아이템 레이아웃 명시적 설정
          getItemLayout={getItemLayout}
          // 초기 스크롤 인덱스
          initialScrollIndex={selectedQuizIndex}
          ///// 뷰 트래킹 관련
          // 뷰 트래킹 판단 기준 설정
          viewabilityConfig={viewabilityConfig}
          // 보이는 아이템 변경 핸들러
          onViewableItemsChanged={onViewableItemsChanged}
          // ///// 성능 최적화 관련
          ////////////////////임시 코드
          removeClippedSubviews={false} // 모든 아이템 렌더링 보장
          onScrollToIndexFailed={onScrollToIndexFailed}
          ////////////////////임시 코드
          // removeClippedSubviews={true} // 화면 밖 아이템 메모리에서 제거
          // maxToRenderPerBatch={3} // 한번에 렌더링할 아이템 수 제한

          ///// 기타
          // 스크롤바 숨김 여부
          showsVerticalScrollIndicator={false} // 스크롤바 숨기기
          // 하단 로딩 인디케이터
          ListFooterComponent={
            loading ? (
              <LoadingContainer>
                <ActivityIndicator size='large' color={theme.colors.core.white} animating={true} />
              </LoadingContainer>
            ) : null
          }
        />
        {/* 스크롤 애니메이션 */}
        <ScrollAnimation />
        {/* 퀴즈 댓글창 */}
        <QuizCommentModal />
        {/* 토스트 */}
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
