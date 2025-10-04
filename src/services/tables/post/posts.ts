import { supabase } from '@/lib/supabaseClient'
import { CommunityCategoryType, PostType } from '@/types/community/community'
import { createPostStats } from './post_stats'

////////// 게시물 생성
async function createPost(postData: PostType) {
  try {
    const response = await supabase.from('posts').insert(postData).select()

    // 포스트 스탯 생성
    if (response.data) {
      await createPostStats(response.data[0].id)
    }

    return response
  } catch (error) {
    throw error
  }
}

////////// 게시물 상세 조회
async function getPostById(id: number) {
  try {
    const response = await supabase
      .from('posts')
      .select(
        `
        *,
        users (
          nickname
        ),
        post_stats (
          viewCount,
          likeCount,
          commentCount
        )
      `
      )
      .eq('id', id)
      .single()

    return response
  } catch (error) {
    throw error
  }
}

////////// 게시물의 생성일 조회
async function getPostCreatedAt(id: number) {
  try {
    const response = await getPostById(id)
    return response.data.createdAt
  } catch (error) {
    throw error
  }
}

////////// 게시물 댓글 목록 조회
async function getCommentsByPostId(postId: number) {
  try {
    const response = await supabase.from('post_comments').select('*').eq('postId', postId)

    return response
  } catch (error) {
    throw error
  }
}

////////// 이전/다음 게시물 조회 함수 파라미터 타입
type GetPreviousAndNextPostParamsType = {
  currentPostId: number
  category: CommunityCategoryType
}

////////// 이전/다음 게시물 조회
async function getPreviousAndNextPost({
  currentPostId,
  category,
}: GetPreviousAndNextPostParamsType) {
  try {
    // 현재 게시물의 생성일 조회
    const currentPostCreatedAt = await getPostCreatedAt(currentPostId)

    // 이전 게시물 조회 쿼리
    let prevPostQuery = supabase
      .from('posts')
      .select(
        `
      id, title, 
      post_stats (
        viewCount,
        likeCount,
        commentCount
      )
      `
      )
      .lt('createdAt', currentPostCreatedAt)

    // 다음 게시물 조회 쿼리
    let nextPostQuery = supabase
      .from('posts')
      .select(
        `
      id, title, 
      post_stats (
        viewCount,
        likeCount,
        commentCount
      )
      `
      )
      .gt('createdAt', currentPostCreatedAt)

    // 카테고리 필터
    if (category !== '자유게시판') {
      prevPostQuery = prevPostQuery.eq('category', category)
      nextPostQuery = nextPostQuery.eq('category', category)
    }

    // 이전/다음 게시물 조회
    const { data: prevPostData } = await prevPostQuery.single()
    const { data: nextPostData } = await nextPostQuery.single()

    return [prevPostData, nextPostData]
  } catch (error) {
    throw error
  }
}

export { createPost, getCommentsByPostId, getPostById, getPostCreatedAt, getPreviousAndNextPost }

