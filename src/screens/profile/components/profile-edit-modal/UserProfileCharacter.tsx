import { PROFILE_CHARACTER_LIST } from '@/constants/profileImages'
import { useProfileEditStore } from '@/stores/screens/profile/profileEdit'
import { useUserProfileStore } from '@/stores/screens/profile/userProfile'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import EditProfileCharacter from './EditProfileCharacter'

const UserProfileCharacter = () => {
  const { userProfile } = useUserProfileStore()
  const { profileCharacter } = userProfile
  const { setProfileCharacterEditModalOpen } = useProfileEditStore()

  return (
    <ProfileImageEditContainer onPress={() => setProfileCharacterEditModalOpen(true)}>
      {/* 프로필 이미지 */}
      <ProfileImageContainer>
        <ProfileImage
          source={PROFILE_CHARACTER_LIST.find((item) => item.key === profileCharacter)?.source}
        />
      </ProfileImageContainer>
      {/* 프로필 이미지 수정 버튼 */}
      <ProfileEditButton onPress={() => setProfileCharacterEditModalOpen(true)}>
        <MaterialCommunityIcons name='pencil-outline' size={20} color={theme.colors.core.white} />
      </ProfileEditButton>

      {/* 프로필 캐릭터 수정 모달*/}
      <EditProfileCharacter />
    </ProfileImageEditContainer>
  )
}

export default UserProfileCharacter

const ProfileImageContainer = styled(View)`
  width: 100px;
  height: 100px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.7);
`

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
`

const ProfileImageEditContainer = styled(TouchableOpacity)`
  position: relative;
`

const ProfileEditButton = styled(TouchableOpacity)`
  position: absolute;
  z-index: 1;
  bottom: 0px;
  right: 0px;
  ${mixinFlex('row', 'center', 'center')}
  width: 30px;
  height: 30px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid ${theme.colors.core.white};
  background-color: ${theme.colors.background.paper};
`
