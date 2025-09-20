import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function StockDetailLayout() {
  return (
    <SafeAreaProvider>
      <Container>
        <StatusBar style='light' backgroundColor={theme.colors.background.paper} translucent />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
      </Container>
    </SafeAreaProvider>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.paper};
`
