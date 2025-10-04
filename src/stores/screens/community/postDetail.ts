import { getPostComments } from '@/services/tables/post/post_comments'
import { PostType, PreviousAndNextPostListType } from '@/types/community/community'
import { PostCommentType } from '@/types/community/post_comments'
import { create } from 'zustand'

type StoreType = {
  // 로딩
  loading: boolean
  // 로딩 설정
  setLoading: (loading: boolean) => void

  // 게시물 아이디
  postId: number
  // 게시물 아이디 설정
  setPostId: (postId: number) => void

  // 게시물 상세 데이터
  postDetail: PostType | null
  // 게시물 상세 데이터 설정
  setPostDetail: (postDetail: PostType) => void

  // 댓글 목록
  comments: PostCommentType[]
  // 댓글 목록 설정
  setComments: (comments: PostCommentType[]) => void
  // 댓글 목록 추가
  addComment: (comment: PostCommentType) => void
  // 댓글 목록 조회
  fetchComments: (postId: number) => void

  // 입력한 댓글 값
  inputComment: string
  // 입력한 댓글 값 설정
  setInputComment: (inputComment: string) => void
  // 입력한 댓글 값 초기화
  clearInputComment: () => void

  // 이전/다음 게시물 목록
  previousAndNextPostList: PreviousAndNextPostListType
  // 이전/다음 게시물 목록 설정
  setPreviousAndNextPostList: (previousAndNextPostList: PreviousAndNextPostListType) => void
}

export const usePostDetailStore = create<StoreType>((set) => ({
  // 로딩
  loading: false,
  // 로딩 설정
  setLoading: (loading) => set({ loading }),

  // 게시물 아이디
  postId: 0,
  // 게시물 아이디 설정
  setPostId: (postId) => set({ postId }),

  // 게시물 상세 데이터
  postDetail: null,
  // 게시물 상세 데이터 설정
  setPostDetail: (postDetail) => set({ postDetail }),

  // 댓글 목록
  comments: [],
  // 댓글 목록 설정
  setComments: (comments) => set({ comments }),
  // 댓글 목록 추가
  addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
  // 댓글 목록 조회
  fetchComments: async (postId) => {
    const response = await getPostComments(postId)
    set({ comments: response.data || [] })
  },

  // 입력한 댓글 값
  inputComment: '',
  // 입력한 댓글 값 설정
  setInputComment: (inputComment) => set({ inputComment }),
  // 입력한 댓글 값 초기화
  clearInputComment: () => set({ inputComment: '' }),

  // 이전/다음 게시물 목록
  previousAndNextPostList: [],
  // 이전/다음 게시물 목록 설정
  setPreviousAndNextPostList: (previousAndNextPostList) => set({ previousAndNextPostList }),
}))
