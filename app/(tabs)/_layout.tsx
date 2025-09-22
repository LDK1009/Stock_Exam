import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import 'react-native-url-polyfill/auto'

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <Container>
        {/* iOS에서는 expo-status-bar를 통해 스타일 설정 */}
        <StatusBar style='light' backgroundColor={theme.colors.background.paper} translucent />

        <StyledTabs
          screenOptions={{
            tabBarStyle: StyledTabBar,
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
            tabBarShowLabel: false,
            headerShown: false,
          }}
        >
          {/* 홈 */}
          <Tabs.Screen
            name='index'
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <TabIcon>
                  <Ionicons name='home-outline' size={theme.iconSizes.md} color={color} />
                </TabIcon>
              ),
            }}
          />
          {/* 종목 */}
          <Tabs.Screen
            name='stock'
            options={{
              title: 'Stock',
              tabBarIcon: ({ color }) => (
                <TabIcon>
                  <FontAwesome name='building-o' size={theme.iconSizes.md} color={color} />
                </TabIcon>
              ),
            }}
          />
          {/* 퀴즈 */}
          <Tabs.Screen
            name='quiz'
            options={{
              title: 'Quiz',
              tabBarIcon: ({ color }) => (
                <TabIcon>
                  <MaterialIcons name='quiz' size={theme.iconSizes.md} color={color} />
                </TabIcon>
              ),
            }}
          />
          {/* 뉴스 */}
          <Tabs.Screen
            name='community'
            options={{
              title: 'ㅊommunity',
              tabBarIcon: ({ color }) => (
                <TabIcon>
                  <MaterialIcons name='article' size={theme.iconSizes.md} color={color} />
                </TabIcon>
              ),
            }}
          />
          {/* 프로필 */}
          <Tabs.Screen
            name='profile'
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => (
                <TabIcon>
                  <Ionicons name='person-outline' size={theme.iconSizes.md} color={color} />
                </TabIcon>
              ),
            }}
          />
        </StyledTabs>
      </Container>
    </SafeAreaProvider>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.paper};
`

const StyledTabs = styled(Tabs)``

const StyledTabBar = {
  backgroundColor: theme.colors.background.paper,
  height: theme.iconSizes.md * 2, // 아이콘 크기의 2배 (위아래 여백 포함)
  paddingTop: 12,
  elevation: 0, // 안드로이드 그림자 제거
  shadowOpacity: 0, // iOS 그림자 제거
  borderTopWidth: 0,
}

const TabIcon = styled.View`
  width: ${theme.iconSizes.md};
  height: ${theme.iconSizes.md};
`
