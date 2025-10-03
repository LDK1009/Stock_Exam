import { PROFILE_CHARACTER_LIST } from '@/constants/profileImages'
import { useProfileEditStore } from '@/stores/screens/profile/profileEdit'
import { useUserProfileStore } from '@/stores/screens/profile/userProfile'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import ProfileEditModal from './profile-edit-modal/ProfileEditModal'

const ProfileSection = () => {
  ///// 유저 프로필 스토어
  const { userProfile } = useUserProfileStore()
  ///// 유저 프로필 비구조화 할당
  const { nickname, profileCharacter } = userProfile

  ///// 프로필 수정 모달 스토어
  const { setOpen } = useProfileEditStore()
  
  return (
    <Container>
      {/* 이미지와 이름 */}
      <ImageAndNameContainer>
        {/* 프로필 이미지 */}
        <ProfileImageContainer>
          <ProfileImage
            source={PROFILE_CHARACTER_LIST.find((item) => item.key === profileCharacter)?.source}
          />
        </ProfileImageContainer>
        {/* 프로필 이름 */}
        <ProfileName>{nickname}</ProfileName>
      </ImageAndNameContainer>

      {/* 수정 버튼 */}
      <EditButton onPress={() => setOpen(true)}>
        <MaterialIcons name='create' size={20} color={theme.colors.core.white} />
      </EditButton>

      {/* 프로필 수정 모달 */}
      <ProfileEditModal />
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
