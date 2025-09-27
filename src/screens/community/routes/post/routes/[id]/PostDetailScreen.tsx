import CommonLoading from '@/components/feedback/CommonLoading'
import { getCommentsByPostId, getPostById } from '@/services/tables/posts'
import { theme } from '@/styles/theme'
import { PostType } from '@/types/community/community'
import { PostCommentListType } from '@/types/community/postComment'
import styled from '@emotion/native'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native'
import CommentSection from './components/CommentSection'
import NavigationSection from './components/NavigationSection'
import PostSection from './components/PostSection'

const PostDetailScreen = () => {
  const { id } = useLocalSearchParams()

  const [postDeatil, setPostDeatil] = useState<PostType | null>(null)
  const [commentList, setCommentList] = useState<PostCommentListType | null>([
    {
      id: '1',
      postId: '1',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
    {
      id: '2',
      postId: '2',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
    {
      id: '3',
      postId: '3',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
    {
      id: '4',
      postId: '4',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
    {
      id: '5',
      postId: '5',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
    {
      id: '6',
      postId: '6',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
    {
      id: '7',
      postId: '7',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
    {
      id: '8',
      postId: '8',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
    {
      id: '9',
      postId: '9',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
    {
      id: '10',
      postId: '10',
      parentId: null,
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
    },
  ])

  ///// 게시글 상세 조회
  async function fetchPostDetail() {
    if (id && typeof id === 'string') {
      const response = await getPostById(id)
      setPostDeatil(response.data)
    }
  }

  ///// 댓글 가져오기
  async function fetchCommentList() {
    if (id && typeof id === 'string') {
      const response = await getCommentsByPostId(id)
      setCommentList(response.data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPostDetail()
      //   fetchCommentList()
    }, [])
  )

  if (!postDeatil) {
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
      <PostSection post={postDeatil} />
      <CommentSection commentList={commentList} />
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
