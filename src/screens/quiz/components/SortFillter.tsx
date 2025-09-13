import { useQuizFilterStore } from '@/stores/screens/quiz/filter'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { QuizSortType } from '@/types/quiz'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'

const SortFillter = () => {
  const { sort, setSort } = useQuizFilterStore()
  const options: QuizSortType[] = ['인기순', '최신순', '오래된순', '난이도순', '난이도역순']
  const [currentSortIndex, setCurrentSortIndex] = useState(0)

  const handleSort = () => {
    // 다음 인덱스 계산
    const nextIndex = (currentSortIndex + 1) % options.length

    // 다음 인덱스 상태 업데이트
    setCurrentSortIndex(nextIndex)

    // 정렬 필터 설정
    setSort(options[nextIndex])
  }

  return (
    <Container onPress={handleSort}>
      <SortText>{sort}</SortText>
      <SortIcon name='chevron-down' size={12} />
    </Container>
  )
}

export default SortFillter

const Container = styled(TouchableOpacity)`
  ${mixinFlex('row', 'flex-start', 'center')}
  height: 100%;
`

const SortIcon = styled(Ionicons)`
  color: ${theme.colors.core.white};
`

const SortText = styled(Text)`
  color: ${theme.colors.core.white};
  font-size: ${`${theme.fontSizes.caption}px`};
`
