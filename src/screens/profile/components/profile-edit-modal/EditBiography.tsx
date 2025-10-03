import CommonInputText from '@/components/input/CommonInputText'
import { useUserProfileStore } from '@/stores/screens/profile/userProfile'
import { theme } from '@/styles/theme'
import React from 'react'

const EditBiography = () => {
  const { userProfile, setUserProfileProperty } = useUserProfileStore()
  const { biography } = userProfile

  return (
    <CommonInputText
      placeholder='한 줄 소개'
      onChangeText={(text) => setUserProfileProperty('biography', text)}
      value={biography || ''}
      containerStyle={{ backgroundColor: `${theme.colors.background.default}` }}
    />
  )
}

export default EditBiography
