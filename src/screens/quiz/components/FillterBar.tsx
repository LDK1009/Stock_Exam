import { mixinFlex } from '@/styles/mixins'
import styled from '@emotion/native'
import React from 'react'
import { View } from 'react-native'
import DifficultyFilter from './DifficultyFillter'
import TypeFilter from './TypeFillter'

const FillterBar = () => {
  return (
    <Container>
      <FillterButtonWrapper>
        <DifficultyFilter />
        <TypeFilter />
      </FillterButtonWrapper>
    </Container>
  )
}

export default FillterBar

const Container = styled(View)`
  ${mixinFlex('row', 'space-between', 'center')}
  width: 100%;
  background-color: red;
`

const FillterButtonWrapper = styled(View)`
  ${mixinFlex('row', 'flex-start', 'center')}
  width: auto;
  column-gap: 8px;
  background-color: blue;
`
