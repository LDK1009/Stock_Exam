// app/auth/_layout.tsx
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      <Container>
        {/* iOS에서는 expo-status-bar를 통해 스타일 설정 */}
        <StatusBar style='light' backgroundColor={theme.colors.background.paper} translucent />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='login' />
          <Stack.Screen name='callback' />
          <Stack.Screen name='signup' />
        </Stack>
      </Container>
    </SafeAreaProvider>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.paper};
`
