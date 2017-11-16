import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { purple, white } from '../utils/helpers'
import TextButton from './TextButton'

export default function QuizResults ({ total, correct, returnFunction } ) {

  let percentage = (correct / total ) * 100
  return (
    <View>
      <Text>{percentage + "%"}</Text>
      <TextButton
        onPress={returnFunction}
        style={{color: purple}}
        children="Go Back"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
})
