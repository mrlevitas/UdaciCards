import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { purple, white } from '../utils/helpers'
import TextButton from './TextButton'

export default function QuizResults ({ total, correct, returnFunction, resetQuiz} ) {

  let percentage = (correct / total ) * 100
  return (
    <View style={styles.containerNcenter}>
      <Text>{percentage + "%"}</Text>
      <TextButton
        onPress={returnFunction}
        style={styles.centerNpurp}
        children="Back to Deck"/>
      <TextButton
        onPress={resetQuiz}
        style={styles.centerNpurp}
        children="Restart Quiz"/>
    </View>
  )
}

const styles = StyleSheet.create({
  containerNcenter: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerNpurp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    color: purple
  },
})
