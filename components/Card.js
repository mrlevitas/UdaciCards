import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white } from '../utils/helpers'

export default function Card ({ qLength, qHash, onPress, index, correctCount, displayAnswer } ) {

  var answer = displayAnswer ?
      <Text style={styles.center} >{qHash.answer}</Text>
    : <Text style={styles.center} onPress={() => onPress()}>See Answer</Text>

  return (
    <View style={styles.container}>
      <Text>{(index + 1) + "/" + qLength}</Text>
      <Text style={styles.center}>{qHash.question}</Text>
      {answer}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})
