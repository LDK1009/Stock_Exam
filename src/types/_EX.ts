/**
 * TYPES 폴더
 * 
 * TypeScript 타입들을 정의하는 곳입니다.
 * 데이터의 구조를 미리 정해서 오류를 방지합니다.
 */

// 사용자 타입
export interface ExampleType {
  id: string;
  name: string;
  email: string;
  age?: number;
}