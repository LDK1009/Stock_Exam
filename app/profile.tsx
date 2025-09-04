import { mixinContainer, mixinFlex } from '@/styles/mixins'
import styled from '@emotion/native'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  return (
    <Container>
      <Content>
        <Text>Profile Screen</Text>
      </Content>
    </Container>
  )
}

export default ProfileScreen

const Container = styled(SafeAreaView)`
  ${mixinContainer}
`

const Content = styled(View)`
  flex: 1;
  ${mixinFlex('column', 'center', 'center')};
`
