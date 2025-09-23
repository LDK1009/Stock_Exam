import React from 'react'
import { Text, View } from 'react-native'

type PropsType = {
  postId: string
}

const CommentSection = ({ postId }: PropsType) => {

    
  return (
    <View>
      <Text>CommentSection</Text>
    </View>
  )
}

export default CommentSection