import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const ProfileSection = () => {
  return (
    <Container>
      <ImageAndNameContainer>
        <ProfileImageContainer>
          <ProfileImage source={require('@assets/images/profile-character/tiger.png')} />
        </ProfileImageContainer>
        <ProfileName>배고픈 호랑이</ProfileName>
      </ImageAndNameContainer>

      <EditButton>
        <MaterialIcons name='create' size={20} color={theme.colors.core.white} />
      </EditButton>
    </Container>
  )
}

export default ProfileSection

const Container = styled(View)`
  width: 100%;
  ${mixinFlex('row', 'space-between', 'center')}
`

const ImageAndNameContainer = styled(View)`
  ${mixinFlex('row', 'flex-start', 'center')}
  column-gap: 8px;
`

const ProfileImageContainer = styled(View)`
  width: 50px;
  height: 50px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  overflow: hidden;
`

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
`

const ProfileName = styled(Text)`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const EditButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: 40px;
  height: 40px;
  border: 1px solid ${theme.colors.core.white};
  border-radius: 50%;
  overflow: hidden;
`
