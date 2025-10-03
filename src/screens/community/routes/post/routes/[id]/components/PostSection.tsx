import { usePostDetailStore } from '@/stores/screens/community/postDetail'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { formatDate } from '@/utils/time'
import styled from '@emotion/native'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const PostSection = () => {
  const { postDetail } = usePostDetailStore()
  const { title, createdAt, content, users, post_stats } = postDetail || {}
  const { viewCount, likeCount, commentCount } = post_stats || {}
  const { nickname } = users || {}

  // 처음 입장 시에만 측정하기 위한 ref
  const hasMeasured = useRef(false)
  const [isContentExpanded, setIsContentExpanded] = useState(true)

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

  return (
    <Container>
      {/* 제목 */}
      <Title>{title}</Title>

      {/* 헤더 */}
      <Header>
        {/* 작성자 */}
        <HeaderText>{nickname}</HeaderText>
        {/* 작성일 */}
        <HeaderText>{formatDate(new Date(createdAt || ''), '.')}</HeaderText>
      </Header>

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
          <CountText>댓글 {likeCount}</CountText>
          <CountText>추천 {commentCount}</CountText>
        </CountContainer>
        {/* 추천 버튼 */}
        <RecommendeContainer>
          <RecommendeButton>
            <MaterialIcons name='trending-up' size={16} color='white' />
          </RecommendeButton>
          <RecommendeCountText>{commentCount}</RecommendeCountText>
        </RecommendeContainer>
      </FooterContainer>
    </Container>
  )
}

export default PostSection

const Container = styled(View)`
  ${mixinFlex('column', 'flex-start', 'center')}
  row-gap: 16px;
  width: 100%;
`

const Title = styled(Text)`
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

const RecommendeContainer = styled(View)`
  ${mixinFlex('row', 'center', 'center')}
  column-gap: 4px;
`

const RecommendeButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 1px solid ${theme.colors.core.white};
`

const RecommendeCountText = styled(Text)`
  font-size: ${`${theme.fontSizes.subtitle}px`};
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.5);
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
