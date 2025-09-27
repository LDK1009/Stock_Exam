////////// 퀴즈 타입
type QuizType = {
  id?: number // 식별 번호
  userId?: string // 유저 아이디
  
  category: string // 주제
  step: '학습' | '실천' | '고찰' | '응용' // 단계
  type: '객관식' | 'OX' // 타입(객관식, 주관식, OX)
  difficulty: number // 난이도(숫자가 높을수록 어려움)
  score: number // 정답 시 주는 레벨업 점수

  question: string // 질문
  options: string[] | null // 보기(객관식일때는 보기가 3개, OX일떄는 보기가 2개)
  tags: string[] // 검색/추천용 키워드

  answer: number // 정답
  explanation: string // 문제 해설

  createdAt?: string // 생성일
  updatedAt?: string // 수정일
}

////////// 퀴즈 리스트 타입
type QuizListType = QuizType[]

////////// 퀴즈 카테고리 타입
type QuizCategoryType =
  | '전체'
  | '재무상태표'
  | '현금흐름표'
  | '자본변동표'
  | '손익계산서'
  | '재무비율'
  | '분석원칙'
  | '투자판단'

////////// 퀴즈 난이도 타입
type QuizDifficultyType = 1 | 2 | 3

////////// 퀴즈 유형 타입
type QuizTypeType = '객관식' | 'OX'

type QuizSortType = '인기순' | '최신순' | '오래된순' | '난이도순' | '난이도역순'

export type {
  QuizCategoryType,
  QuizDifficultyType,
  QuizListType,
  QuizSortType,
  QuizType,
  QuizTypeType
}

