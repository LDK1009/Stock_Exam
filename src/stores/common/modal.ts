import { theme } from '@/styles/theme'
import { create } from 'zustand'

// 사용자 상태
type StoreType = {
  ////////// 상태 관련
  open: boolean
  setOpen: (open: boolean) => void

  ////////// 컨텐츠 관련
  title: string
  setTitle: (title: string) => void

  description: string
  setDescription: (description: string) => void

  confirmText: string
  setConfirmText: (confirmText: string) => void

  cancelText: string
  setCancelText: (cancelText: string) => void

  setContent: (title: string, description: string, confirmText: string, cancelText: string) => void

  ////////// 이벤트 관련

  onConfirm: () => void
  onCancel: () => void

  setEvent: (onConfirm: () => void, onCancel: () => void) => void

  ////////// 스타일 관련
  backgroundColor: string
  setBackgroundColor: (backgroundColor: string) => void

  backdropColor: string
  setBackdropColor: (backdropColor: string) => void

  borderRadius: number
  setBorderRadius: (borderRadius: number) => void
}

export const useConfirmModalStore = create<StoreType>((set) => ({
  ////////// 상태 관련
  open: false,
  setOpen: (open) => set({ open }),

  ////////// 컨텐츠 관련
  title: '',
  setTitle: (title) => set({ title }),

  description: '',
  setDescription: (description) => set({ description }),

  confirmText: '확인',
  setConfirmText: (confirmText) => set({ confirmText }),

  cancelText: '취소',
  setCancelText: (cancelText) => set({ cancelText }),

  setContent: (title: string, description: string, confirmText: string, cancelText: string) =>
    set({ title, description, confirmText, cancelText }),

  ////////// 이벤트 관련
  onConfirm: () => set({ open: false }),
  onCancel: () => set({ open: false }),
  setEvent: (onConfirm, onCancel) => set({ onConfirm, onCancel }),

  ////////// 스타일 관련
  backgroundColor: theme.colors.background.paper,
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),

  backdropColor: 'rgba(0, 0, 0, 0.7)',
  setBackdropColor: (backdropColor) => set({ backdropColor }),

  borderRadius: 16,
  setBorderRadius: (borderRadius) => set({ borderRadius }),
}))
