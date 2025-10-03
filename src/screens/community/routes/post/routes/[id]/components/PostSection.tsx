import { getUserId } from '@/services/auth/auth'
import { createUserPostLike, deleteUserPostLike } from '@/services/tables/post/post_likes'
import { usePostDetailStore } from '@/stores/screens/community/postDetail'
import { usePostDetailFooterStore } from '@/stores/screens/community/postDetailFooter'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { formatDate } from '@/utils/time'
import styled from '@emotion/native'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const PostSection = () => {
  ///// 스토어
  const { postDetail } = usePostDetailStore()
  const { userLikedList, addUserLikedList, removeUserLikedList } = usePostDetailFooterStore()
  ///// 게시물 상세 데이터
  const { id, title, createdAt, content, users, post_stats } = postDetail || {}
  ///// 게시물 통계 데이터
  const { viewCount, likeCount, commentCount } = post_stats || {}
  ///// 게시물 작성자 데이터
  const { nickname } = users || {}

  // 처음 입장 시에만 측정하기 위한 ref
  const hasMeasured = useRef(false)
  const [isContentExpanded, setIsContentExpanded] = useState(true)

  ///// 본문 높이 측정
  const handleTextLayout = (event: any) => {
    // 이미 측정했다면 무시
    if (hasMeasured.current) return

    const { height } = event.nativeEvent.layout

    // 높이가 300px을 넘으면 접힌 상태로, 아니면 펼친 상태로 설정
    if (height >= 300) {
      setIsContentExpanded(false)
    } else {
      setIsContentExpanded(true)
    }

    // 측정 완료 표시
    hasMeasured.current = true
  }

  ///// 좋아요 버튼 클릭
  async function handleLikeButtonPress() {
    const userId = await getUserId()
    if (!userId) return

    if (isLiked) {
      removeUserLikedList(Number(id))
      await deleteUserPostLike({ postId: Number(id), userId: userId })
    } else {
      addUserLikedList(Number(id))
      await createUserPostLike({ postId: Number(id), userId: userId })
    }
  }

  const isLiked = userLikedList.includes(Number(id))

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
        <Content expanded={isContentExpanded} onLayout={handleTextLayout}>
          {content}
        </Content>
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
