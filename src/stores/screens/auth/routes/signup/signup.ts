import { getUser } from '@/services/tables/users'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  nickname: string
  setNickname: (nickname: string) => void

  profileCharacter: string
  setProfileCharacter: (profileCharacter: string) => void

  biography: string
  setBiography: (biography: string) => void

  setUser: (nickname: string, profileCharacter: string, biography: string) => void
  fetchUser: () => Promise<void>
}

export const useSignupStore = create<StoreType>((set) => ({
  nickname: '',
  setNickname: (nickname) => set({ nickname }),

  profileCharacter: '',
  setProfileCharacter: (profileCharacter) => set({ profileCharacter }),

  biography: '',
  setBiography: (biography) => set({ biography }),

  setUser: (nickname, profileCharacter, biography) => set({ nickname, profileCharacter, biography }),
  fetchUser: async () => {
    const user = await getUser()
    set({ nickname: user.nickname, profileCharacter: user.profileCharacter, biography: user.biography })
  },
}))
