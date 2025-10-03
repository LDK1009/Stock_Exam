import { UserType } from '@/types/auth/user'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  userProfile: UserType
  setUserProfile: (userProfile: UserType) => void
}

export const useUserProfileStore = create<StoreType>((set) => ({
  userProfile: {
    id: '',
    email: '',
    nickname: '',
    profileImageSrc: '',
    profileCharacter: '',
    biography: '',
    level: 0,
    experience: 0,
    notificationEnabled: false,
    createdAt: '',
    updatedAt: '',
  },

  setUserProfile: (userProfile) => set({ userProfile }),
}))
