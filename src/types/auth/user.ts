type UserType = {
  id: string
  email: string
  nickname: string
  profileImageSrc: string
  profileCharacter: string
  biography: string
  level: number
  experience: number
  notificationEnabled: boolean
  createdAt: string
  updatedAt: string
}

type CreateUserType = {
  email: string
  nickname: string
  profileImageSrc: string
  profileCharacter: string
  biography: string
}

export default UserType
