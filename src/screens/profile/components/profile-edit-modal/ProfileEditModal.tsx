import CommonModal from '@/components/display/CommonModal'
import CommonButton from '@/components/input/CommonButton'
import { getUserId } from '@/services/auth/auth'
import { updateUserProfile } from '@/services/tables/users'
import { useProfileEditStore } from '@/stores/screens/profile/profileEdit'
import { useUserProfileStore } from '@/stores/screens/profile/userProfile'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { View } from 'moti'
import React from 'react'
import Toast from 'react-native-toast-message'
import EditBiography from './EditBiography'
import EditNickname from './EditNickname'
import UserProfileCharacter from './UserProfileCharacter'

const ProfileEditModal = () => {
  ////// 프로필 수정 모달 스토어
  const { open, setOpen } = useProfileEditStore()

  ////// 유저 프로필 스토어
  const { userProfile } = useUserProfileStore()

  ////// 유저 프로필 수정
  async function handleUpdatePress() {
    const userId = await getUserId()
    const { nickname, profileCharacter } = userProfile

    // 유저 ID 확인
    if (!userId) {
      Toast.show({
        type: 'error',
        text1: '모든 정보를 입력해주세요.',
      })

      return
    }

    // 닉네임 확인
    if (!nickname) {
      Toast.show({
        type: 'error',
        text1: '모든 정보를 입력해주세요.',
      })
      return
    }

    // 프로필 캐릭터 확인
    if (!profileCharacter) {
      Toast.show({
        type: 'error',
        text1: '프로필 캐릭터를 선택해주세요.',
      })
      return
    }

    // 유저 프로필 수정
    await updateUserProfile({ userId, updateData: userProfile })

    // 수정 완료 알림
    Toast.show({
      type: 'success',
      text1: '프로필 수정 완료',
    })

    // 프로필 수정 모달 닫기
    setOpen(false)
  }

  return (
    <CommonModal open={open} setClose={() => setOpen(false)} backdropColor='rgba(0, 0, 0, 0.9)'>
      <Container>
        {/* 유저 프로필 캐릭터 */}
        <UserProfileCharacter />
        <InputContainer>
          {/* 유저 닉네임 */}
          <EditNickname />
          {/* 유저 한 줄 소개 */}
          <EditBiography />
        </InputContainer>
        <CommonButton
          title='수정하기'
          onPress={handleUpdatePress}
          containerStyle={{ backgroundColor: `${theme.colors.primary.main}`, padding: 12 }}
          textStyle={{ fontSize: theme.fontSizes.body, fontWeight: 'bold' }}
        />
      </Container>
    </CommonModal>
  )
}

export default ProfileEditModal

const Container = styled(View)`
  ${mixinFlex('column', 'center', 'center')};
  row-gap: 24px;

  width: 300px;
  height: auto;
  padding: 32px 16px;

  background-color: ${theme.colors.background.paper};
  border-radius: 16px;
`

const InputContainer = styled(View)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 8px;

  width: 100%;
`
