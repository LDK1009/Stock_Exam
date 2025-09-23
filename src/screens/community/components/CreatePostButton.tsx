import CommonToast from '@/components/feedback/CommonToast'
import CommonDropDown from '@/components/input/CommonDropDown'
import CommonInputText from '@/components/input/CommonInputText'
import { isAuthenticated } from '@/services/auth/auth'
import { createPost } from '@/services/tables/posts'
import { useCreatePostStore } from '@/stores/screens/community/ui/createPost'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import { CommunityCategoryType } from '@/types/community/community'
import styled from '@emotion/native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

const CreatePostButton = () => {
  const { open, setOpen, category, setCategory, title, setTitle, content, setContent } =
    useCreatePostStore()

  ///// 게시판 선택 드롭다운 옵션
  // 카테고리 드롭다운 옵션
  const categoryOptions: {
    label: CommunityCategoryType
    value: CommunityCategoryType
  }[] = [
    { label: '자유게시판', value: '자유게시판' },
    { label: '종목토론', value: '종목토론' },
    { label: '라고할때살걸', value: '라고할때살걸' },
    { label: '주린이', value: '주린이' },
    { label: '마인드컨트롤', value: '마인드컨트롤' },
    { label: '투자자문', value: '투자자문' },
  ]

  ///// 글쓰기 버튼 클릭
  async function buttonPress() {
    const userIsAuthenticated = await isAuthenticated()

    // 로그인 여부 확인
    if (!userIsAuthenticated) {
      setOpen(false)
      Toast.show({
        type: 'error',
        text1: '로그인 후 이용 가능합니다.',
      })
      router.push('/auth/login')
      return
    }

    setOpen(true)
  }

  async function createPostButtonPress() {
    ///// 로그인 여부
    const userIsAuthenticated = await isAuthenticated()

    ///// 로그인 X
    if (!userIsAuthenticated) {
      setOpen(false)
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: '로그인 후 이용 가능합니다.',
        })
      }, 0)
      return
    }

    ///// 로그인 O
    ///// 모든 필수 항목 입력 확인
    if (!category || !title || !content) {
      Toast.show({
        type: 'error',
        text1: '모든 필수 항목을 입력해주세요.',
      })
      return
    }

    await createPost({
      category,
      title,
      content,
    })

    ///// 모달 닫기
    setOpen(false)

    ///// 글쓰기 완료 알림
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: '글쓰기 완료',
      })
    }, 0)

    return
  }

  return (
    <Container>
      <IconButton onPress={buttonPress}>
        <Ionicons name='add' size={24} color='#FFFFFF' />
      </IconButton>

      {/* 모달 */}
      <Modal visible={open} transparent animationType='fade' onRequestClose={() => setOpen(false)}>
        <ModalContainer>
          <CategoryNInputContainer>
            {/* 게시판 선택 */}
            <CommonDropDown
              options={categoryOptions}
              placeholder={category === null ? '카테고리' : category}
              onChange={(value) => {
                setCategory(value)
              }}
            />

            {/* 입력 컨테이너 */}
            <InputContainer>
              {/* 제목 입력 */}
              <CommonInputText
                placeholder='제목을 입력하세요.'
                onChangeText={(text) => setTitle(text)}
                value={title}
              />

              {/* 본문 입력 */}
              <CommonInputText
                placeholder='본문을 입력하세요.'
                onChangeText={(text) => setContent(text)}
                value={content}
                multiline={true}
                containerStyle={{
                  height: 400,
                  textAlignVertical: 'top',
                }}
              />
            </InputContainer>
          </CategoryNInputContainer>

          {/* 완료 버튼 */}
          <WriteButton onPress={createPostButtonPress}>
            <MaterialIcons name='create' size={20} color={theme.colors.core.white} />
            <WriteButtonText>글쓰기</WriteButtonText>
          </WriteButton>

          {/* 토스트 */}
          <CommonToast />
        </ModalContainer>
      </Modal>
    </Container>
  )
}

export default CreatePostButton

const Container = styled(View)`
  ${mixinFlex('row', 'center', 'center')}
  width: 100%;
  height: 50px;
`

const IconButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: 30px;
  height: 30px;
  background-color: ${theme.colors.background.paper};
  border-radius: 999px;
  border: 1px solid #333333;
`

const ModalContainer = styled(View)`
  ${mixinFlex('column', 'space-between', 'stretch')}
  row-gap: 24px;
  padding: 32px;
  flex: 1;

  background-color: ${theme.colors.background.default};
`

const CategoryNInputContainer = styled(View)`
  width: 100%;
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 24px;
`

const InputContainer = styled(View)`
  width: 100%;
  ${mixinFlex('column', 'flex-start', 'flex-start')}
  row-gap: 24px;
`

const WriteButton = styled(TouchableOpacity)`
  ${mixinFlex('row', 'center', 'center')}
  width: 100%;
  column-gap: 4px;
  padding: 8px;
  background-color: ${theme.colors.background.paper};
  border-radius: 8px;
`

const WriteButtonText = styled(Text)`
  font-size: ${`${theme.fontSizes.body}px`};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.core.white};
`
