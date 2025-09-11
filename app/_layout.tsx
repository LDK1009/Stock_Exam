import { theme } from '@/styles/theme'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Platform, StatusBar as RNStatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-url-polyfill/auto'

export default function RootLayout() {
  useEffect(() => {
    // 시스템 UI 색상 설정 - 앱 시작시 한 번만 실행
    if (Platform.OS === 'android') {
      // Android에서는 StatusBar 배경색과 스타일을 직접 설정
      RNStatusBar.setBackgroundColor(theme.colors.background.paper)
      RNStatusBar.setBarStyle('light-content')
    }
  }, []) // 빈 의존성 배열로 앱 시작시 한 번만 실행

  return (
    <SafeAreaProvider>
      {/* iOS에서는 expo-status-bar를 통해 스타일 설정 */}
      <StatusBar 
        style='light'
        backgroundColor={theme.colors.background.paper}
        translucent
      />
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='auth' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  )
}