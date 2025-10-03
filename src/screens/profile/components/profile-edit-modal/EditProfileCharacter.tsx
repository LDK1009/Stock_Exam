import CommonModal from '@/components/display/CommonModal'
import { PROFILE_CHARACTER_LIST } from '@/constants/profileImages'
import { useProfileEditStore } from '@/stores/screens/profile/profileEdit'
import { useUserProfileStore } from '@/stores/screens/profile/userProfile'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import {
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View
} from 'react-native'

const EditProfileCharacter = () => {
  ////// 유저 프로필 스토어
  const { setUserProfileProperty } = useUserProfileStore()
  ////// 프로필 수정 모달 스토어
  const { profileCharacterEditModalOpen, setProfileCharacterEditModalOpen } = useProfileEditStore()

  ////////// 프로필 캐릭터 아이템 렌더링 타입
  type RenderProfileCharacterItemType = {
    item: {
      name: string
      key: string
      source: ImageSourcePropType
    }
  }

  ////////// 프로필 캐릭터 컴포넌트
  const ProfileCharacterItem = ({ item }: RenderProfileCharacterItemType) => {
    const { key, source } = item

    function handleProfileCharacterPress(key: string) {
      setUserProfileProperty('profileCharacter', key)
      setProfileCharacterEditModalOpen(false)
    }

    return (
      <ProfileCharacterContainer onPress={() => handleProfileCharacterPress(key)}>
        <ProfileImage source={source} />
      </ProfileCharacterContainer>
    )
  }

  return (
    <CommonModal
      open={profileCharacterEditModalOpen}
      setClose={() => setProfileCharacterEditModalOpen(false)}
      backdropColor='rgba(0, 0, 0, 0.7)'
    >
      <FlatListContainer>
        <FlatList
          data={PROFILE_CHARACTER_LIST}
          numColumns={3}
          columnWrapperStyle={{ gap: 16 }} // 열 간격
          renderItem={ProfileCharacterItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ padding: 16, gap: 16 }}
        />
      </FlatListContainer>
    </CommonModal>
  )
}

export default EditProfileCharacter

const ProfileCharacterContainer = styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.7);
`

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
`

const FlatListContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  height: 206px;
  background-color: ${theme.colors.background.paper};
  border-radius: 16px;
`
