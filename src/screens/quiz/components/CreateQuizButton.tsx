import CommonToast from '@/components/feedback/CommonToast'
import CommonButton from '@/components/input/CommonButton'
import CommonDropDown from '@/components/input/CommonDropDown'
import InputText from '@/components/input/CommonInputText'
import { isAuthenticated } from '@/services/auth/auth'
import { createQuiz } from '@/services/tables/quizzes'
import { useCreateQuizStore } from '@/stores/screens/quiz/ui/createQuiz'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizCategoryType, QuizDifficultyType, QuizType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

const CreateQuizButton = () => {
  const { open, setOpen, quizData, setQuizDataProperty, clearQuizData, setQuizDataOptionProperty } =
    useCreateQuizStore()

  // 카테고리 드롭다운 옵션
  const categoryData: {
    label: QuizCategoryType
    value: QuizCategoryType
  }[] = [
    { label: '재무상태표', value: '재무상태표' },
    { label: '현금흐름표', value: '현금흐름표' },
    { label: '자본변동표', value: '자본변동표' },
    { label: '손익계산서', value: '손익계산서' },
    { label: '재무비율', value: '재무비율' },
    { label: '분석원칙', value: '분석원칙' },
    { label: '투자판단', value: '투자판단' },
  ]

  // 난이도 드롭다운 옵션
  const difficultyData: {
    label: '쉬움' | '보통' | '어려움'
    value: QuizDifficultyType
  }[] = [
    { label: '쉬움', value: 1 },
    { label: '보통', value: 2 },
    { label: '어려움', value: 3 },
  ]

  // 정답 드롭다운 옵션
  const answerData: {
    label: string
    value: number
  }[] = [
    { label: '1번', value: 1 },
    { label: '2번', value: 2 },
    { label: '3번', value: 3 },
  ]

  async function buttonPress() {
    const userIsAuthenticated = await isAuthenticated()

    // 로그인 여부 확인
    if (!userIsAuthenticated) {
      setOpen(false)
      Toast.show({
        type: 'error',
        text1: '로그인 후 이용 가능합니다.',
      })
      router.push('/auth/login')
      return
    }

    setOpen(true)
  }

  async function createQuizButtonPress() {
    const { category, difficulty, question, options, answer, explanation } = quizData

    ///// 로그인 검증
    const userIsAuthenticated = await isAuthenticated()
    if (!userIsAuthenticated) {
      setOpen(false)
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: '로그인 후 이용 가능합니다.',
        })
      }, 500)
      return
    }

    if (!category || !difficulty || !question || !options || !answer || !explanation) {
      Toast.show({
        type: 'error',
        text1: '모든 필수 항목을 입력해주세요.',
      })
      return
    }

    // 퀴즈 생성
    await createQuiz(quizData as QuizType)

    // 입력값 초기화
    clearQuizData()

    // 모달 닫기
    setOpen(false)

    // 토스트 띄우기
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: '퀴즈 생성 완료',
      })
    }, 500)
  }

  return (
    <Container>
      <IconButton onPress={buttonPress}>
        <Ionicons name='add' size={24} color='#FFFFFF' />
      </IconButton>

      {/* 모달 */}
      <Modal visible={open} transparent animationType='fade' onRequestClose={() => setOpen(false)}>
        <ModalContainer
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            rowGap: 24,
            paddingBottom: 80, // 이거 추가
          }}
        >
          {/* 설정 */}
          <SectionContainer>
            <SubTitle>설정</SubTitle>
            <CommonDropDown
              options={categoryData}
              placeholder={quizData.category ? quizData.category : '카테고리'}
              onChange={(value) => {
                setQuizDataProperty('category', value)
              }}
            />
            <CommonDropDown
              options={difficultyData}
              placeholder={
                quizData.difficulty
                  ? (difficultyData.find((el) => el.value === quizData.difficulty)?.label ??
                    '난이도')
                  : '난이도'
              }
              onChange={(value) => {
                setQuizDataProperty('difficulty', value)
              }}
            />

            <CommonButton
              title='고급'
              onPress={() => {
                Toast.show({
                  type: 'info',
                  text1: '준비중인 기능입니다.',
                  position: 'top',
                  autoHide: true,
                  topOffset: 0,
                })
              }}
            />
          </SectionContainer>

          {/* 문제 */}
          <SectionContainer>
            <SubTitle>문제</SubTitle>
            <InputText
              placeholder='Q. 제목 입력'
              onChangeText={(text) => setQuizDataProperty('question', text)}
              value={quizData.question}
              placeholderStyle={{
                fontSize: `${theme.fontSizes.title}px`,
                fontWeight: theme.fontWeights.bold,
              }}
            />
            <InputText
              placeholder='① 보기1 입력'
              onChangeText={(text) => setQuizDataOptionProperty(0, text)}
              value={quizData.options[0]}
            />
            <InputText
              placeholder='② 보기2 입력'
              onChangeText={(text) => setQuizDataOptionProperty(1, text)}
              value={quizData.options[1]}
            />
            <InputText
              placeholder='③ 보기3 입력'
              onChangeText={(text) => setQuizDataOptionProperty(2, text)}
              value={quizData.options[2]}
            />
          </SectionContainer>

          {/* 정답 및 해설 */}
          <SectionContainer>
            <SubTitle>정답 및 해설</SubTitle>
            <CommonDropDown
              options={answerData}
              placeholder={
                quizData.answer
                  ? (answerData.find((el) => el.value === quizData.answer)?.label ?? '정답')
                  : '정답'
              }
              onChange={(value) => {
                setQuizDataProperty('answer', value)
              }}
            />
            <InputText
              placeholder='해설 입력'
              onChangeText={(text) => setQuizDataProperty('explanation', text)}
              value={quizData.explanation}
            />
          </SectionContainer>

          {/* 완료 버튼 */}
          <CommonButton title='완료' onPress={createQuizButtonPress} />

          {/* 토스트 */}
          <CommonToast />
        </ModalContainer>
      </Modal>
    </Container>
  )
}

export default CreateQuizButton

const Container = styled(View)`
  ${mixinFlex('row', 'center', 'center')}
  width: 100%;
  height: 50px;
`

const IconButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: 30px;
  height: 30px;
  background-color: ${theme.colors.background.paper};
  border-radius: 999px;
  border: 1px solid #333333;
`

const ModalContainer = styled(ScrollView)`
  padding: 40px;
  padding-bottom: 80px;
  flex: 1;

  background-color: ${theme.colors.background.default};
`

const SubTitle = styled(Text)`
  width: 100%;
  color: ${theme.colors.core.white};
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.bold};
`

const SectionContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  row-gap: 8px;
  width: 100%;
`
