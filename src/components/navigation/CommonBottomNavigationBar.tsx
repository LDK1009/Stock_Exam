import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

const CommonBottomNavigationBar = () => {
  return (
    <Container>
      <Ionicons name='home-outline' size={24} color='white' />
      <MaterialIcons name='quiz' size={24} color='white' />
      <MaterialIcons name='article' size={24} color='white' />
      <Ionicons name='person-outline' size={24} color='white' />
    </Container>
  )
}

export default CommonBottomNavigationBar

const Container = styled(View)`
  width: 100%;
  height: 83px;

  ${mixinFlex('row', 'space-evenly', 'center')};
  position: absolute;
  bottom: 0;
  left: 0;

  background-color: ${theme.colors.background.default};
`
