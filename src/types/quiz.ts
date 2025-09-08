type QuizType = {
  id?: number // 식별 번호
  category: string // 주제
  step: '학습' | '실천' | '고찰' | '응용' // 단계
  type : "객관식" | "OX" // 타입(객관식, 주관식, OX) 
  difficulty: "쉬움" | "보통" | "어려움" // 난이도
  score: number // 정답 시 주는 레벨업 점수

  question: string // 질문
  options: string[] | null // 보기(객관식일때는 보기가 3개, OX일떄는 보기가 2개)
  tags: string[] // 검색/추천용 키워드

  answer: number // 정답
  explanation: string // 문제 해설

  createdAt?: string // 생성일
  updatedAt?: string // 수정일
}

type QuizListType = QuizType[]

export type { QuizListType, QuizType }

