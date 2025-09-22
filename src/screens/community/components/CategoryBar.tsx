import { useCommunityFilterStore } from '@/stores/screens/community/filter'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { CommunityCategoryType } from '@/types/community/community'
import styled from '@emotion/native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'

const CategoryBar = () => {
  const categoryVariants: CommunityCategoryType[] = [
    '자유게시판',
    '주린이',
    '종목토론',
    '라고할때살걸',
    '마인드컨트롤',
    '투자자문',
  ]

  const { category, setCategory } = useCommunityFilterStore()

  return (
    <Container horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
      {categoryVariants.map((el, index) => (
        <CategoryButton key={index} onPress={() => setCategory(el)} isSelected={category === el}>
          <CategoryText isSelected={category === el}>{el}</CategoryText>
        </CategoryButton>
      ))}
    </Container>
  )
}

export default CategoryBar

const Container = styled(ScrollView)`
  min-height: 26px; // 최소 높이 설정
  max-height: 26px; // 최대 높이 설정
  flex: 1; // 필요한 만큼 늘어나도록
`
type CategoryButtonProps = {
  isSelected: boolean
}

const CategoryButton = styled(TouchableOpacity)<CategoryButtonProps>`
  ${mixinFlex('column', 'center', 'center')}
  padding: 4px;
  height: 100%; // 부모 높이만큼 차지
  min-height: 26px; // 최소 높이 보장
  border-bottom-width: ${({ isSelected }) => (isSelected ? '2px' : '1px')};
  border-bottom-color: ${({ isSelected }) =>
    isSelected ? `${theme.colors.core.white}` : 'rgba(255, 255, 255, 0.5)'};
`

const CategoryText = styled(Text)<CategoryButtonProps>`
  color: ${({ isSelected }) => (isSelected ? theme.colors.core.white : 'rgba(255, 255, 255, 0.5)')};
  font-size: ${theme.fontSizes.caption};
`
