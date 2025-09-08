import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';


// 환경 변수에서 Supabase 프로젝트 URL과 익명 키를 가져옵니다.
// 느낌표(!)는 TypeScript에게 이 값이 반드시 존재함을 알려주는 non-null assertion 연산자입니다.
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl!;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey!;

// Supabase 클라이언트 인스턴스를 생성하고 내보냅니다.
// 이 인스턴스를 통해 Supabase의 모든 기능(데이터베이스, 인증, 스토리지 등)에 접근할 수 있습니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
