import { getUserId, isAuthenticated } from '@/services/auth/auth'
import { createUserPostLike, deleteUserPostLike } from '@/services/tables/post/post_likes'
import { useConfirmModalStore } from '@/stores/common/modal'
import { usePostDetailStore } from '@/stores/screens/community/postDetail'
import { usePostDetailFooterStore } from '@/stores/screens/community/postDetailFooter'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { formatDate } from '@/utils/time'
import styled from '@emotion/native'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const PostSection = () => {
  ///// 게시물 상세 스토어
  const { postDetail } = usePostDetailStore()
  ///// 푸터 스토어
  const { userLikedList, addUserLikedList, removeUserLikedList } = usePostDetailFooterStore()
  ///// 컨펌 모달 스토어
  const { setConfirmLogin, setEventCallback } = useConfirmModalStore()
  ///// 더보기 버튼 확장 여부
  const [isContentExpanded, setIsContentExpanded] = useState(true)

  ///// 게시물 상세 데이터 구조분해할당
  const { id, title, createdAt, content, users, post_stats } = postDetail || {}
  ///// 조회수, 좋아요 수, 댓글 수 구조분해할당
  const { viewCount, likeCount, commentCount } = post_stats || {}
  ///// 닉네임 구조분해할당
  const { nickname } = users || {}
  ///// 게시물 좋아요 여부
  const isLiked = userLikedList.includes(Number(id))

  ///// 좋아요 버튼 클릭
  async function handleLikeButtonPress() {
    // 로그인 여부 확인
    const isUserAuthenticated = await isAuthenticated()

    // 비로그인 상태면 로그인 컨펌 모달 열기
    if (!isUserAuthenticated) {
      setEventCallback({
        onConfirmCallback: () => {},
        onCancelCallback: () => {},
      })
      setConfirmLogin('좋아요를 남기려면 로그인이 필요합니다.')
      return
    }

    // 유저 ID 가져오기
    const userId = await getUserId()
    // 유저 ID가 없으면 종료
    if (!userId) return

    // 좋아요 여부에 따라 좋아요 추가 또는 제거
    if (isLiked) {
      removeUserLikedList(Number(id))
      await deleteUserPostLike({ postId: Number(id), userId: userId })
    } else {
      addUserLikedList(Number(id))
      await createUserPostLike({ postId: Number(id), userId: userId })
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (content?.length && content?.length > 300) {
        setIsContentExpanded(false)
      } else {
        setIsContentExpanded(true)
      }
    }, [content])
  )

  return (
    <Container>
      <HeaderContainer>
        {/* 제목 */}
        <Title>{title}</Title>

        {/* 헤더 */}
        <Header>
          {/* 작성자 */}
          <HeaderText>{nickname}</HeaderText>
          {/* 작성일 */}
          <HeaderText>{formatDate(new Date(createdAt || ''), '.')}</HeaderText>
        </Header>
      </HeaderContainer>

      {/* 본문 */}
      <ContentArea>
        {/* 본문 */}
        <Content expanded={isContentExpanded}>{content}</Content>
        {/* 더보기 버튼 */}
        {!isContentExpanded && (
          <ReadMoreButton onPress={() => setIsContentExpanded(true)}>
            <LinearGradientContainer colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']}>
              <Entypo name='chevron-down' size={20} color='white' />
              <ReadMoreButtonText>{isContentExpanded ? '접기' : '더보기'}</ReadMoreButtonText>
            </LinearGradientContainer>
          </ReadMoreButton>
        )}
      </ContentArea>

      {/* 하단 */}
      <FooterContainer>
        {/* 조회, 댓글, 추천 수 */}
        <CountContainer>
          <CountText>조회 {viewCount}</CountText>
          <CountText>댓글 {commentCount}</CountText>
          <CountText>추천 {likeCount}</CountText>
        </CountContainer>
        {/* 추천 버튼 */}
        <RecommendeContainer onPress={handleLikeButtonPress}>
          <RecommendeButton onPress={handleLikeButtonPress} isLiked={isLiked}>
            <MaterialIcons
              name='trending-up'
              size={16}
              color={isLiked ? theme.colors.core.white : 'rgba(255,255,255,0.5)'}
            />
          </RecommendeButton>
          <RecommendeCountText isLiked={isLiked}>
            {isLiked ? (likeCount || 0) + 1 : likeCount || 0}
          </RecommendeCountText>
        </RecommendeContainer>
      </FooterContainer>
    </Container>
  )
}

export default PostSection

const Container = styled(View)`
  ${mixinFlex('column', 'flex-start', 'center')}
  row-gap: 24px;
  width: 100%;
`

const HeaderContainer = styled(View)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  width: 100%;
  row-gap: 8px;
`

const Title = styled(Text)`
  width: 100%;
  font-size: 20px;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const Header = styled(View)`
  ${mixinFlex('row', 'space-between', 'center')}
  width: 100%;
`

const HeaderText = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.7);
`

type ContentProps = {
  expanded: boolean
}

const ContentArea = styled(View)`
  width: 100%;
  position: relative;
`

const Content = styled(Text)<ContentProps>`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.core.white};
  height: ${({ expanded }) => (expanded ? 'auto' : '300px')};
`

const ReadMoreButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}

  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
`

const LinearGradientContainer = styled(LinearGradient)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 4px;
  width: 100%;
  height: 60px;
`

const ReadMoreButtonText = styled(Text)`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const FooterContainer = styled(View)`
  width: 100%;
  ${mixinFlex('row', 'space-between', 'center')}
`

const RecommendeContainer = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 4px;
`

type RecommendeButtonProps = {
  isLiked: boolean
}

const RecommendeButton = styled(TouchableOpacity)<RecommendeButtonProps>`
  ${mixinFlex('row', 'center', 'center')}
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isLiked }) => (isLiked ? theme.colors.core.white : 'rgba(255,255,255,0.5)')};
`

type RecommendeCountTextProps = {
  isLiked: boolean
}

const RecommendeCountText = styled(Text)<RecommendeCountTextProps>`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.regular};
  color: ${({ isLiked }) => (isLiked ? theme.colors.core.white : 'rgba(255,255,255,0.5)')};
`

const CountContainer = styled(View)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 8px;
`

const CountText = styled(Text)`
  font-size: ${`${theme.fontSizes.caption}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.5);
`
