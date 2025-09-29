import CommonBottomSheet from '@/components/display/CommonBottomSheet'
import { useCommentDrawerStore } from '@/stores/screens/quiz/ui/commentDrawer'
import { mixinFlex } from '@/styles/mixins'
import { QuizCommentType } from '@/types/quiz/quiz_comments'
import styled from '@emotion/native'
import React from 'react'
import { FlatList, View } from 'react-native'
import CommentItem from './CommentItem'

const QuizCommentModal = () => {
  const { open, setOpen } = useCommentDrawerStore()

  const sampleCommentsData: QuizCommentType[] = [
    {
      id: '1',
      quizId: '1',
      userId: '배고픈하마',
      content:
        '저는 은행에서 증권사로 옮길 생각이 없습니다. 퇴직연금이 손실을 입을까 염려되기 때문입니다. 앞으로 67년 정도 더 받을 수 있는데, 만약 손실이 발생하면 기간이 34년으로 줄어들 수 있어 안정성이 무엇보다 중요하다고 생각합니다.',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    },
    {
      id: '2',
      quizId: '1',
      userId: '주식초보',
      content: '좋은 정보 감사합니다! 퇴직연금 관련해서 더 자세히 알고 싶어요.',
      createdAt: '2021-01-02',
      updatedAt: '2021-01-02',
    },
    {
      id: '3',
      quizId: '1',
      userId: '투자마스터',
      content: '증권사로 옮기는 것도 나쁘지 않을 수 있어요. 수수료 절약 효과가 클 수 있거든요.',
      createdAt: '2021-01-03',
      updatedAt: '2021-01-03',
    },
    {
      id: '4',
      quizId: '1',
      userId: '펀드매니저',
      content: '안정성과 수익성 사이의 균형을 잘 맞춰야 하는 것 같습니다.',
      createdAt: '2021-01-04',
      updatedAt: '2021-01-04',
    },
    {
      id: '5',
      quizId: '1',
      userId: '재테크고수',
      content: '개인적으로는 증권사로 옮긴 후 더 나은 수익을 얻고 있어요.',
      createdAt: '2021-01-05',
      updatedAt: '2021-01-05',
    },
    {
      id: '6',
      quizId: '1',
      userId: '은행직원',
      content: '은행에서도 다양한 상품이 있어서 충분히 좋은 수익을 낼 수 있어요.',
      createdAt: '2021-01-06',
      updatedAt: '2021-01-06',
    },
    {
      id: '7',
      quizId: '1',
      userId: '퇴직준비생',
      content: '퇴직연금은 정말 신중하게 결정해야 할 것 같습니다.',
      createdAt: '2021-01-07',
      updatedAt: '2021-01-07',
    },
    {
      id: '8',
      quizId: '1',
      userId: '금융전문가',
      content: '각자의 상황에 맞는 선택을 하는 것이 가장 중요합니다.',
      createdAt: '2021-01-08',
      updatedAt: '2021-01-08',
    },
    {
      id: '9',
      quizId: '1',
      userId: '투자심리학자',
      content: '리스크 관리가 투자의 핵심이라고 생각해요.',
      createdAt: '2021-01-09',
      updatedAt: '2021-01-09',
    },
    {
      id: '10',
      quizId: '1',
      userId: '자산관리사',
      content: '장기적인 관점에서 포트폴리오를 구성하는 것이 좋겠네요.',
      createdAt: '2021-01-10',
      updatedAt: '2021-01-10',
    },
  ]

  const renderItem = ({ item }: { item: QuizCommentType }) => {
    return <CommentItem comment={item} />
  }

  return (
    <CommonBottomSheet visible={open} onClose={() => setOpen(false)} height={400}>
      <Container>
        <Hr />
        <FlatList
          data={sampleCommentsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          nestedScrollEnabled
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ gap: 16 }}
        />
      </Container>
    </CommonBottomSheet>
  )
}

export default QuizCommentModal

const Container = styled(View)`
  ${mixinFlex('column', 'flex-start', 'center')}
  row-gap: 16px;
  flex: 1;
  width: 100%;
  padding: 16px 32px;
`

const Hr = styled(View)`
  width: 200px;
  height: 3px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.3);
`
