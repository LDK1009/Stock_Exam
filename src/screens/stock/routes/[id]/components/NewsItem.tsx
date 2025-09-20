import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { NewsType } from '@/types/news/news'
import styled from '@emotion/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

type PropsType = {
  news: NewsType
}

const NewsItem = ({ news }: PropsType) => {
  return (
    <Container>
      <Thumbnail source={{ uri: news.thumbnail }} style={{ width: 300, height: 300 }} />
      <NewsText>
        <NewsTitle numberOfLines={2}>{news.title}</NewsTitle>
        <NewsDescription numberOfLines={2}>{news.description}</NewsDescription>
      </NewsText>
    </Container>
  )
}

export default NewsItem

const Container = styled(TouchableOpacity)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  width: 300px;
  overflow: hidden;
  border-radius: 16px;
`

const Thumbnail = styled(Image)``

const NewsText = styled(View)`
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 8px;
  height: 100%;

  width: 100%;
  padding: 16px;

  background-color: ${theme.colors.background.paper};
`

const NewsTitle = styled(Text)`
  font-size: 20px;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`

const NewsDescription = styled(Text)`
  font-size: 16px;
  font-weight: ${theme.fontWeights.regular};
  color: rgba(255, 255, 255, 0.7);
`
