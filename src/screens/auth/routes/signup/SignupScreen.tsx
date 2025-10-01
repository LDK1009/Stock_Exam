import CommonInputText from '@/components/input/CommonInputText'
import { PROFILE_CHARACTER_LIST } from '@/constants/profileImages'
import { completeUserProfile } from '@/services/tables/users'
import { useSignupStore } from '@/stores/screens/auth/routes/signup/signup'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import ProfileCharacterEditModal from './components/ProfileEditModal'

const SignupScreen = () => {
  ////////// 유저 정보 상태
  const { nickname, profileCharacter, biography, fetchUser, setNickname, setBiography } =
    useSignupStore()

  ////////// 프로필 캐릭터 수정 모달 상태
  const [modalVisible, setModalVisible] = useState(false)

  async function handleCompletePress() {
    if (!nickname || !profileCharacter || !biography) {
      Toast.show({
        type: 'error',
        text1: '모든 정보를 입력해주세요.',
      })
      return
    }

    await completeUserProfile({ nickname, profileCharacter, biography })
    router.push('/')
    Toast.show({
      type: 'success',
      text1: '회원가입 완료',
    })
  }

  ////////// 건너뛰기 버튼 클릭 시 이벤트
  function handleSkipPress() {
    router.push('/')
  }

  ////////// 포커스 시 유저 정보 가져오기
  useFocusEffect(
    useCallback(() => {
      fetchUser()
    }, [])
  )

  return (
    <Container>
      <ProfileImageEditContainer onPress={() => setModalVisible(true)}>
        {/* 프로필 이미지 */}
        <ProfileImageContainer>
          <ProfileImage
            source={PROFILE_CHARACTER_LIST.find((item) => item.key === profileCharacter)?.source}
          />
        </ProfileImageContainer>
        {/* 프로필 이미지 수정 버튼 */}
        <ProfileEditButton onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name='pencil-outline' size={20} color={theme.colors.core.white} />
        </ProfileEditButton>
      </ProfileImageEditContainer>
      <InputContainer>
        {/* 닉네임 입력 */}
        <CommonInputText placeholder='닉네임' onChangeText={setNickname} value={nickname} />
        {/* 한 줄 소개 입력 */}
        <CommonInputText placeholder='한 줄 소개' onChangeText={setBiography} value={biography} />
      </InputContainer>
      <ButtonContainer>
        {/* 회원가입 완료 버튼 */}
        <CompleteButton onPress={handleCompletePress}>
          <CompleteButtonText>회원가입 완료</CompleteButtonText>
        </CompleteButton>
        {/* 건너뛰기 버튼 */}
        <SkipButton onPress={handleSkipPress}>
          <SkipButtonText>건너뛰기</SkipButtonText>
        </SkipButton>
      </ButtonContainer>
      {/* 프로필 캐릭터 수정 모달 */}
      <ProfileCharacterEditModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </Container>
  )
}

export default SignupScreen

const Container = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  flex: 1;
  background-color: ${theme.colors.background.default};
  padding: 32px 16px;
  padding-bottom: 0px;
  row-gap: 24px;
`

const InputContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  width: 100%;
  row-gap: 8px;
`

const ButtonContainer = styled(View)`
  ${mixinFlex('column', 'center', 'center')}
  width: 100%;
  row-gap: 8px;

  margin-top: 48px;
`

const SkipButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}

  width: 100%;
  height: 40px;
  background-color: ${theme.colors.background.paper};
  border-radius: 8px;
`

const SkipButtonText = styled(Text)`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
`

const CompleteButton = styled(SkipButton)`
  background-color: ${theme.colors.primary.main};
`

const CompleteButtonText = styled(SkipButtonText)`
  font-weight: bold;
  color: ${theme.colors.core.white};
`

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
