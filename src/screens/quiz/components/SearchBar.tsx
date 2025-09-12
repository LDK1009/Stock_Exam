import { useQuizFilterStore } from '@/stores/screens/quiz/filter'
import { mixinFlex } from '@/styles/mixins'
import { theme } from '@/styles/theme'
import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native'

const SearchBar = () => {
  const { inputValue, setInputValue, setSearchValue, clearInputValue } = useQuizFilterStore()

  const handleSubmit = () => {
    setSearchValue(inputValue)
  }

  return (
    <Container>
      <TouchableOpacity onPress={handleSubmit}>
        <SearchIcon name='search' size={24} />
      </TouchableOpacity>
      <SearchInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder='문제 검색'
        placeholderTextColor={`rgba(255, 255, 255, 0.5)`}
        returnKeyType='search'
        onSubmitEditing={handleSubmit}
        autoCapitalize='none'
        autoComplete='off'
      />
      {inputValue && (
        <TouchableOpacity onPress={clearInputValue}>
          <ClearIcon name='close-circle' size={24} />
        </TouchableOpacity>
      )}
    </Container>
  )
}

export default SearchBar

const Container = styled.View`
  width: 100%;
  height: 40px;
  padding: 0px 16px;
  ${mixinFlex('row', 'flex-start', 'center')}
  background-color: ${theme.colors.background.paper};
  border-radius: 999px;
`

const SearchInput = styled(TextInput)`
  flex: 1;
  height: 100%;
  font-size: ${theme.fontSizes.body}px;
  color: ${theme.colors.core.white};
`

const SearchIcon = styled(Ionicons)`
  color: rgba(255, 255, 255, 0.5);
  margin-right: 8px;
`

const ClearIcon = styled(Ionicons)`
  color: rgba(255, 255, 255, 0.5);
`
