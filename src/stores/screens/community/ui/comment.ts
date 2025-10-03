import { create } from 'zustand'

type StoreType = {
  postId: number
  setPostId: (postId: number) => void

  // 댓글 목록
  //   comments: PostCommentType[]
  // 댓글 목록 설정
  //   setComments: (comments: PostCommentType[]) => void
  // 댓글 목록 추가
  //   addComments: (comment: PostCommentType) => void
  // 댓글 목록 조회
  //   fetchComments: (postId: number) => void

  // 입력한 댓글 값
  inputComment: string
  // 입력한 댓글 값 설정
  setInputComment: (inputComment: string) => void

  // 입력한 댓글 값 초기화
  clearInputComment: () => void
}

export const useCommunityCommentStore = create<StoreType>((set) => ({
  postId: 0,
  setPostId: (postId) => set({ postId }),

  //   comments: [],
  //   setComments: (comments) => set({ comments }),
  //   addComments: (comment) => set((state) => ({ comments: [...state.comments, comment] })),

  //   fetchComments: async (postId) => {
  //     const response = await getPostComments(postId)
  //     set({ comments: response.data || [] })
  //   },

  inputComment: '',
  setInputComment: (inputComment) => set({ inputComment }),
  clearInputComment: () => set({ inputComment: '' }),
}))
