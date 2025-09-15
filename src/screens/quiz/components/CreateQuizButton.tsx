import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const CreateQuizButton = () => {
  return (
    <Container>
      <IconButton>
        <Ionicons name='add' size={24} color='#FFFFFF' />
      </IconButton>
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
