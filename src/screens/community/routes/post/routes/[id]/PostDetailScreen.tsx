import CommonLoading from '@/components/feedback/CommonLoading'
import { getUserId } from '@/services/auth/auth'
import { getPostComments } from '@/services/tables/post/post_comments'
import { getUserPostLikes } from '@/services/tables/post/post_likes'
import { incrementPostViewCount } from '@/services/tables/post/post_stats'
import { getPostById, getPreviousAndNextPost } from '@/services/tables/post/posts'
import { useCommunityFilterStore } from '@/stores/screens/community/filter'
import { usePostDetailStore } from '@/stores/screens/community/postDetail'
import { usePostDetailFooterStore } from '@/stores/screens/community/postDetailFooter'
import { theme } from '@/styles/theme'
import { PreviousAndNextPostListType } from '@/types/community/community'
import styled from '@emotion/native'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { BackHandler, ScrollView } from 'react-native'
import CommentSection from './components/CommentSection'
import NavigationSection from './components/NavigationSection'
import PostSection from './components/PostSection'

const PostDetailScreen = () => {
  const { id } = useLocalSearchParams()

  /////
  const { category } = useCommunityFilterStore()
  ///// 게시물 상세 스토어
  const {
    setPostId,
    postDetail,
    setPostDetail,
    setComments,
    setLoading,
    loading,
    setPreviousAndNextPostList,
  } = usePostDetailStore()
  ///// 푸터 스토어
  const { setUserLikedList } = usePostDetailFooterStore()

  ///// 게시글 상세 조회
  async function fetchPostDetail() {
    if (id) {
      const response = await getPostById(Number(id))
      setPostDetail(response.data)
    }
  }

  ///// 댓글 목록 조회
  async function fetchComments() {
    if (id) {
      const response = await getPostComments(Number(id))
      setComments(response.data || [])
    }
  }

  ///// 좋아요 목록 조회
  async function fetchUserLikedList() {
    const userId = await getUserId()
    if (!userId) return

    const { data: userLikedList } = await getUserPostLikes({ postId: Number(id), userId })

    setUserLikedList(userLikedList?.map((item) => item.postId) || [])
  }

  ///// 조회수 증가
  async function incrementViewCount() {
    await incrementPostViewCount(Number(id))
  }

  ///// 이전/다음 게시물 조회
  async function fetchPreviousAndNextPost() {
    // 이전/다음 게시물 가져오기
    const response = await getPreviousAndNextPost({
      currentPostId: Number(id),
      category: category,
    })

    // 상태 업데이트
    setPreviousAndNextPostList(response as PreviousAndNextPostListType)
  }

  // 백핸들러(뒤로가기 버튼 눌렀을 때)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      router.replace(`/community`) // 홈으로 이동
      return true // 기본 동작 방지
    })

    return () => backHandler.remove()
  }, [])

  ///// 포커스 이벤트
  useFocusEffect(
    useCallback(() => {
      // 로딩 ON
      setLoading(true)

      // 게시물 아이디 설정
      setPostId(Number(id))
      // 게시물 상세 데이터 조회
      fetchPostDetail()
      // 댓글 목록 조회
      fetchComments()
      // 유저의 게시물 좋아요 목록 조회
      fetchUserLikedList()
      // 게시물 조회수 증가
      incrementViewCount()
      // 이전/다음 게시물 조회
      fetchPreviousAndNextPost()

      // 로딩 OFF
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }, [])
  )

  ///// 게시물 상세 데이터 조회 완료 전 로딩 표시
  if (!postDetail) {
    return (
      <Container>
        <CommonLoading />
      </Container>
    )
  }

  ///// 로딩 중 로딩 표시
  if (loading) {
    return (
      <Container>
        <CommonLoading />
      </Container>
    )
  }

  return (
    <Container
      contentContainerStyle={{
        rowGap: 48,
        paddingBottom: 50,
      }}
    >
      {/* 게시물 상세 */}
      <PostSection />
      {/* 댓글 */}
      <CommentSection />
      {/* 내비게이션 */}
      <NavigationSection />
    </Container>
  )
}

export default PostDetailScreen

const Container = styled(ScrollView)`
  flex: 1;
  padding: 32px 32px;
  background-color: ${theme.colors.background.default};
`
