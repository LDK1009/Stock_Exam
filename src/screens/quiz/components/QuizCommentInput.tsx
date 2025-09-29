import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

const QuizCommentInput = () => {
  return (
    <Container>
      <InputContainer>
        <StyleTextInput
          placeholder='댓글 추가...'
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          multiline
          textAlignVertical='top'
        />
        <SendButton>
          <Feather name='send' size={18} color={'rgba(255, 255, 255, 0.5)'} />
        </SendButton>
      </InputContainer>
    </Container>
  )
}

export default QuizCommentInput

const Container = styled(View)`
  ${mixinFlex('column', 'center', 'center')}

  width: 100%;
  padding: 16px;

  background-color: #333333;
`

const InputContainer = styled(View)`
  ${mixinFlex('row', 'space-between', 'center')}
  column-gap: 16px;

  width: 100%;
  padding: 8px 16px;

  border-radius: 999px;
  background-color: ${theme.colors.background.paper};
`

const StyleTextInput = styled(TextInput)`
  flex: 1;
  height: 100%;
  font-size: ${theme.fontSizes.body}px;
  color: ${theme.colors.core.white};
`
const SendButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: 30px;
  height: 30px;

  padding-top: 2px;
  padding-right: 2px;

  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 100%;
`
