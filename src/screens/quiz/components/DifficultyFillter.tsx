import { useQuizFilterStore } from '@/stores/screens/quiz/filter'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

const DifficultyFilter = () => {
  const [visible, setVisible] = useState(false)
  const { difficulty, setDifficulty } = useQuizFilterStore()

  const options = ['전체', '쉬움', '보통', '어려움']

  const selectedLabel = options.find((opt) => opt === difficulty) || '난이도'

  return (
    <>
      <FilterButton onPress={() => setVisible(true)}>
        <ButtonText>{selectedLabel}</ButtonText>
        <IconBox>
          <Ionicons name='chevron-down' size={12} color='rgba(255, 255, 255, 0.7)' />
        </IconBox>
      </FilterButton>

      <Modal visible={visible} transparent animationType='fade'>
        <ModalOverlay onPress={() => setVisible(false)}>
          <ModalContent>
            <ModalTitle>난이도</ModalTitle>
            <OptionContainer>
              {options.map((option) => (
                <OptionButton
                  key={option}
                  onPress={() => {
                    setDifficulty(option)
                    setVisible(false)
                  }}
                  isSelected={difficulty === option}
                >
                  <OptionText isSelected={difficulty === option}>{option}</OptionText>
                </OptionButton>
              ))}
            </OptionContainer>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}

export default DifficultyFilter

const FilterButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: auto;
  background-color: transparent;
  border-width: 1px;
  border-radius: 999px;
  border-color: rgba(255, 255, 255, 0.7);
  padding: 8px 12px;
  gap: 4px;
`

const ButtonText = styled(Text)`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${`${theme.fontSizes.caption}px`};
`

const IconBox = styled(View)`
  ${mixinFlex('row', 'center', 'center')}
  height: 100%;
`

const ModalOverlay = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

const ModalContent = styled(View)`
  width: 80%;
  background-color: ${theme.colors.background.paper};
  border-radius: 16px;
  padding: 20px;
`

const ModalTitle = styled(Text)`
  color: ${theme.colors.core.white};
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
  padding-bottom: 16px;
  border-bottom-width: 2px;
  border-bottom-color: 'rgba(255, 255, 255, 0.3)';
`

const OptionContainer = styled(View)`
  padding: 16px 0px;
`

const OptionButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ isSelected }) =>
    isSelected ? `${theme.colors.background.default}` : 'transparent'};
  margin-bottom: 8px;
`

const OptionText = styled(Text)<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? theme.colors.core.white : 'rgba(255, 255, 255, 0.5)')};
  font-size: ${theme.fontSizes.body}px;
  text-align: center;
`
