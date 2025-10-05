import { supabase } from '@/lib/supabaseClient'
import { createQuizUserAnswer, getUserQuizAnswer, updateQuizUserAnswer } from '@/services/tables/quiz/quiz_user_answers'
import { useQuizFilterStore } from '@/stores/screens/quiz/filter'
import { useQuizPlayerStore } from '@/stores/screens/quiz/ui/quizPlayer'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizType } from '@/types/quiz/quiz'
import styled from '@emotion/native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

type PropsType = {
  quiz: QuizType
}

const QuizDetail = ({ quiz }: PropsType) => {
  const [selectedOptionNumber, setSelectedOptionNumber] = useState<number | null>(null)
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)

  const { setOpen: setOpenQuizPlayer } = useQuizPlayerStore()
  const { setInputValue, setSearchValue } = useQuizFilterStore()

  const difficultyMap = {
    1: '쉬움',
    2: '보통',
    3: '어려움',
  }

  const optionNumberMap = {
    0: '①',
    1: '②',
    2: '③',
  }

  const { category, step, type, difficulty, score, question, options, answer, explanation, tags } =
    quiz

  function getOptionStatus(optionNumber: number) {
    if (!isAnswerRevealed) {
      return 'wait'
    }

    if (optionNumber === answer) {
      return 'correct'
    }

    if (selectedOptionNumber === optionNumber) {
      return optionNumber === answer ? 'correct' : 'incorrect'
    }

    return 'revealed'
  }

  async function OptionPressHandler(optionNumber: number) {
    if (isAnswerRevealed) {
      Toast.show({
        type: 'error',
        text1: '이미 정답이 공개되었습니다.',
        position: 'top',
        autoHide: true,
        topOffset: 30,
      })
      return
    }

    const isCorrect = optionNumber === answer
    setIsAnswerRevealed(true)
    setSelectedOptionNumber(optionNumber)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user && quiz.id) {
        const userId = user.id
        const quizId = quiz.id

        const { data: existingAnswer } = await getUserQuizAnswer(userId, quizId)

        if (existingAnswer) {
          await updateQuizUserAnswer(existingAnswer.id, {
            isCorrect,
            selectedAnswer: optionNumber,
            attemptCount: existingAnswer.attemptCount + 1,
          })
        } else {
          await createQuizUserAnswer({
            userId,
            quizId,
            isCorrect,
            selectedAnswer: optionNumber,
            attemptCount: 1,
          })
        }
      }
    } catch (error) {
      console.error('답변 저장 실패:', error)
    }
  }

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
