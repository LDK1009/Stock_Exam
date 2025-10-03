import CommonLoading from '@/components/feedback/CommonLoading'
import { getPostComments } from '@/services/tables/post/post_comments'
import { incrementPostViewCount } from '@/services/tables/post/post_stats'
import { getPostById } from '@/services/tables/post/posts'
import { usePostDetailStore } from '@/stores/screens/community/postDetail'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import CommentSection from './components/CommentSection'
import NavigationSection from './components/NavigationSection'
import PostSection from './components/PostSection'

const PostDetailScreen = () => {
  const { id } = useLocalSearchParams()

  const { setPostId, postDetail, setPostDetail, setComments } = usePostDetailStore()

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

  ///// 조회수 증가
  async function incrementViewCount() {
    await incrementPostViewCount(Number(id))
  }

  useFocusEffect(
    useCallback(() => {
      // 게시물 아이디 설정
      setPostId(Number(id))
      // 게시물 상세 데이터 조회
      fetchPostDetail()
      // 댓글 목록 조회
      fetchComments()
      // 게시물 조회수 증가
      incrementViewCount()
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
  padding: 16px 32px;
  background-color: ${theme.colors.background.default};
`
