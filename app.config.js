// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: '주식고사',
    slug: 'stock-exam',
    version: '1.0.0',

    // ✅ OTA 서버 URL (고정값, 프로젝트마다 다름)
    updates: {
      url: 'https://u.expo.dev/21f2a9db-2523-4ff3-b912-672e555bf3b8',
    },

    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'stockexam',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.stockexam.app',

      // ✅ iOS는 앱 버전 기준으로 runtimeVersion 결정
      runtimeVersion: { policy: 'appVersion' },
    },

    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.stockexam.app',
      edgeToEdgeEnabled: true,

      // ✅ 안드로이드는 문자열 runtimeVersion 고정
      //    (나중에 1.0.1 빌드 뽑을 땐 이 값도 "1.0.1"로 바꿔야 함)
      runtimeVersion: '1.0.0',
    },

    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],

    experiments: { typedRoutes: true },

    extra: {
      eas: { projectId: '21f2a9db-2523-4ff3-b912-672e555bf3b8' },

      // ✅ JS/OTA에서 사용될 공개 변수들
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,

      // 🚫 service_role 키는 절대 넣지 말기 (보안 문제)
    },
  },
};
