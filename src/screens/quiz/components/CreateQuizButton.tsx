import CommonText from '@/components/display/CommonText'
import CommonButton from '@/components/input/CommonButton'
import CommonDropDown from '@/components/input/CommonDropDown'
import InputText from '@/components/input/CommonInputText'
import { useCreateQuizStore } from '@/stores/screens/quiz/ui/createQuiz'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizCategoryType, QuizDifficultyType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

const CreateQuizButton = () => {
  const { open, setOpen, quizData, setQuizDataProperty, clearQuizData, setQuizDataOptionProperty } =
    useCreateQuizStore()

  // 카테고리 드롭다운 옵션
  const categoryData: {
    label: QuizCategoryType
    value: QuizCategoryType
  }[] = [
    { label: '전체', value: '전체' },
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

  return (
    <Container>
      <IconButton onPress={() => setOpen(true)}>
        <Ionicons name='add' size={24} color='#FFFFFF' />
      </IconButton>

      {/* 모달 */}
      <Modal visible={open} transparent animationType='fade' onRequestClose={() => setOpen(false)}>
        <ModalContainer>
          <CommonText>{JSON.stringify(quizData, null, 2)}</CommonText>
          {/* 설정 */}
          <SectionContainer>
            <SubTitle>설정</SubTitle>
            <CommonDropDown
              options={categoryData}
              placeholder='카테고리'
              onChange={(value) => {
                setQuizDataProperty('category', value)
              }}
            />
            <CommonDropDown
              options={difficultyData}
              placeholder='난이도'
              onChange={(value) => {
                setQuizDataProperty('difficulty', value)
              }}
            />

            <CommonButton title='고급' onPress={() => {}} />
          </SectionContainer>

          {/* 문제 */}
          <SectionContainer>
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
              placeholder='② 보기1 입력'
              onChangeText={(text) => setQuizDataOptionProperty(1, text)}
              value={quizData.options[1]}
            />
            <InputText
              placeholder='③ 보기1 입력'
              onChangeText={(text) => setQuizDataOptionProperty(2, text)}
              value={quizData.options[2]}
            />
          </SectionContainer>
          {/* 정답 및 해설 */}
          <SectionContainer></SectionContainer>
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

const ModalContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  padding:40px;
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
