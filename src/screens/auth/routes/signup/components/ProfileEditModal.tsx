import { PROFILE_CHARACTER_LIST } from '@/constants/profileImages'
import { useSignupStore } from '@/stores/screens/auth/routes/signup/signup'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import React from 'react'
import { FlatList, Image, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
type PropsType = {
  visible: boolean
  onClose: () => void
}
const ProfileCharacterEditModal = ({ visible, onClose }: PropsType) => {
  const { setProfileCharacter } = useSignupStore()

  ////////// 아이템 렌더링
  const renderItem = ({ item }: { item: (typeof PROFILE_CHARACTER_LIST)[number] }) => {
    return <ProfileCharacterItem item={item} />
  }

  ////////// 프로필 캐릭터 아이템 컴포넌트
  const ProfileCharacterItem = ({ item }: { item: (typeof PROFILE_CHARACTER_LIST)[number] }) => {
    function handlePress() {
      setProfileCharacter(item.key)
      onClose()
    }

    return (
      <ProfileImageContainer onPress={handlePress}>
        <ProfileImage source={item.source} />
      </ProfileImageContainer>
    )
  }

  return (
    <Container visible={visible} transparent animationType='fade' onRequestClose={onClose}>
      <ModalContainer>
        {/* 백드롭: 화면 전체 덮고 터치 시 닫기 */}
        <BackdropPressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          backgroundColor={'rgba(0, 0, 0, 0.7)'}
        />

        {/* 시트: 백드롭과 형제. 여기엔 onPress 없음 → 내부 스크롤/터치 유지 */}
        <ContentContainer>
          <FlatListContainer>
            <FlatList
              data={PROFILE_CHARACTER_LIST}
              numColumns={3}
              columnWrapperStyle={{ gap: 16 }} // 열 간격
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              contentContainerStyle={{ padding: 16, gap: 16 }}
            />
          </FlatListContainer>
        </ContentContainer>
      </ModalContainer>
    </Container>
  )
}

export default ProfileCharacterEditModal

const Container = styled(Modal)``

const ModalContainer = styled(View)`
  flex: 1;
`

type BackdropProps = { backgroundColor: string }

const BackdropPressable = styled(Pressable)<BackdropProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
`

const ContentContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')};
  flex: 1;
`

const FlatListContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  height: 206px;
  background-color: ${theme.colors.background.paper};
  border-radius: 16px;
`

const ProfileImageContainer = styled(TouchableOpacity)`
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
