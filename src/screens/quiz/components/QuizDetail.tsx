import { useQuizFilterStore } from '@/stores/screens/quiz/filter'
import { useQuizPlayerStore } from '@/stores/screens/quiz/ui/quizPlayer'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  quiz: QuizType
}

const QuizDetail = ({ quiz }: PropsType) => {
  // 선택한 보기 번호
  const [selectedOptionNumber, setSelectedOptionNumber] = useState<number | null>(null)
  //   정답 공개 여부
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)

  // 퀴즈 플레이어 스토어
  const { setOpen: setOpenQuizPlayer } = useQuizPlayerStore()

  // 퀴즈 필터 스토어
  const { setInputValue, setSearchValue } = useQuizFilterStore()

  // 난이도 매핑
  const difficultyMap = {
    1: '쉬움',
    2: '보통',
    3: '어려움',
  }

  // 보기 번호 매핑
  const optionNumberMap = {
    0: '①',
    1: '②',
    2: '③',
  }

  // 퀴즈 데이터 비구조화
  const { category, step, type, difficulty, score, question, options, answer, explanation, tags } =
    quiz

  // 보기 상태값 반환 함수
  function getOptionStatus(optionNumber: number) {
    // 공개되지 않았을 경우
    if (isAnswerRevealed === false) {
      return 'wait'
    }
    // 공개 되었을 경우
    else {
      // 해당 보기가 정답일 경우 정답 상태로 분류(정답 공개)
      if (optionNumber === answer) {
        return 'correct'
      }
      // 해당 보기가 선택된 보기일 경우
      if (selectedOptionNumber === optionNumber) {
        // 선택한 보기가 정답이라면
        if (optionNumber === answer) {
          return 'correct'
        } else {
          return 'incorrect'
        }
      }
      // 선택하지 않은 보기라면
      else {
        return 'revealed'
      }
    }
  }

  // 보기 터치 핸들러
  function OptionPressHandler(optionNumber: number) {
    if (isAnswerRevealed) {
      Alert.alert('이미 정답이 공개되었습니다.')
      return
    }
    // 정답 공개 여부 업데이트
    setIsAnswerRevealed(true)
    // 선택한 보기 번호 업데이트
    setSelectedOptionNumber(optionNumber)
  }

  // 태그 터치 핸들러
  function TagPressHandler(tag: string) {
    setOpenQuizPlayer(false)
    setInputValue(tag)
    setSearchValue(tag)
  }

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <HeaderText>{`${category}ㅣ${step}ㅣ${type}`}</HeaderText>
        <HeaderText>{`${difficultyMap[difficulty as keyof typeof difficultyMap]}ㅣ${score}점`}</HeaderText>
      </Header>

      {/* 질문 & 보기 */}
      <QuestionOptionContainer>
        {/* 질문 */}
        <QuestionText>Q. {question} </QuestionText>

        {/* 보기 */}
        <OptionContainer>
          {options?.map((option, index) => (
            <OptionButton
              key={option}
              onPress={() => {
                OptionPressHandler(index + 1)
              }}
              status={getOptionStatus(index + 1)}
              style={{
                opacity:
                  getOptionStatus(index + 1) === 'revealed' ||
                  getOptionStatus(index + 1) === 'incorrect'
                    ? 0.3
                    : 1,
              }}
            >
              <OptionsText>{`${optionNumberMap[index as keyof typeof optionNumberMap]}. ${option}`}</OptionsText>
            </OptionButton>
          ))}
        </OptionContainer>
      </QuestionOptionContainer>

      {/* 태그 */}
      <TagContainer>
        {tags?.map((tag) => (
          <TagButton
            key={tag}
            onPress={() => {
              TagPressHandler(tag)
            }}
          >
            <TagText>{`#${tag}`}</TagText>
          </TagButton>
        ))}
      </TagContainer>
    </Container>
  )
}

export default QuizDetail

const Container = styled(View)`
  width: 100%;
  height: auto;
  padding: 24px;

  ${mixinFlex('column', 'center', 'center')}
  row-gap: 24px;

  border-radius: 16px;
  background-color: ${theme.colors.background.paper};
`

const Header = styled(View)`
  width: 100%;
  ${mixinFlex('row', 'space-between', 'center')}
`

const HeaderText = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  color: 'rgba(255, 255, 255, 0.7)';
`

const QuestionOptionContainer = styled(View)`
  width: 100%;
  height: auto;
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 16px;
`

const QuestionText = styled(Text)`
  font-size: ${`${theme.fontSizes.title}px`};
  color: ${theme.colors.core.white};
  font-weight: ${theme.fontWeights.bold};
`

const OptionContainer = styled(View)`
  width: 100%;
  height: auto;
  ${mixinFlex('column', 'flex-start', 'center')}
  row-gap: 16px;
`

type OptionButtonProps = {
  status: 'wait' | 'revealed' | 'correct' | 'incorrect'
}

const OptionButton = styled(TouchableOpacity)<OptionButtonProps>`
  width: 100%;
  height: auto;
  padding: 12px 8px;

  ${mixinFlex('row', 'flex-start', 'center')}

  border-radius: 8px;
  background-color: ${({ status }) => {
    if (status === 'incorrect') {
      return `${theme.colors.status.error}`
    }

    return `${theme.colors.primary.main}`
  }};

  transform: ${({ status }) => {
    if (status === 'correct') {
      return 'scale(1.05)'
    }
    return 'scale(1)'
  }};
`

const OptionsText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.core.white};
`

const TagContainer = styled(View)`
  width: 100%;
  ${mixinFlex('row', 'flex-start', 'center')}
  column-gap: 4px;
`

const TagButton = styled(TouchableOpacity)``

const TagText = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  color: 'rgba(255, 255, 255, 0.7)';
`
