import CommonInputText from '@/components/input/CommonInputText'
import { useUserProfileStore } from '@/stores/screens/profile/userProfile'
import { theme } from '@/styles/theme'
import React from 'react'

const EditNickname = () => {

    const { userProfile, setUserProfileProperty } = useUserProfileStore()
    const { nickname } = userProfile

  return (
    <CommonInputText
      placeholder='닉네임'
      onChangeText={(text) => setUserProfileProperty('nickname', text)}
      value={nickname}
      containerStyle={{ backgroundColor: `${theme.colors.background.default}` }}
    />
  )
}

export default EditNickname
