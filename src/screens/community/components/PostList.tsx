import CommonLoading from '@/components/feedback/CommonLoading'
import { useCommunityFilterStore } from '@/stores/screens/community/filter'
import { usePostStore } from '@/stores/screens/community/post'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import PostItem from './PostItem'

const PostList = () => {
  const { postList, loading, canMore, page, getPosts, setPage } = usePostStore()
  const { category } = useCommunityFilterStore()

  // 초기 데이터 로드
  useEffect(() => {
    getPosts(0, category)
  }, [category])

  // 추가 데이터 로드
  const loadMore = () => {
    if (!loading && canMore) {
      const nextPage = page + 1
      setPage(nextPage)
      getPosts(nextPage, category)
    }
  }

  return (
    <FlatList
      data={postList}
      renderItem={({ item }) => <PostItem key={item.id} post={item} />}
      contentContainerStyle={{ gap: 16 }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <CommonLoading /> : null}
    />
  )
}

export default PostList
