import { usePostStore } from '@/stores/screens/community/post'
import React from 'react'
import { FlatList } from 'react-native'
import PostItem from './PostItem'

const PostList = () => {
  const { postList } = usePostStore()

  return (
    <FlatList
      data={postList}
      renderItem={({ item, index }) => <PostItem key={item.id} post={item} />}
      contentContainerStyle={{ gap: 16 }}
      onEndReached={() => {}} // 하단 도달시 추가 로드
      onEndReachedThreshold={0.5} // 하단 50% 지점에서 트리거
      // ListFooterComponent={<CommonLoading>} // 하단 로딩 인디케이터
    />
  )
}

export default PostList
