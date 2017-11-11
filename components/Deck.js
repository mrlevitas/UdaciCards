import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
import TextButton from './TextButton'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'

export default function Deck ({ data }) {

  return (
    <View style={styles.container}>
      <Text>
        {data.title}
      </Text>
      <Text>
        {JSON.stringify(data.questions)}
      </Text>
    </View>
  )
}

// <TextButton style={{margin: 20}} onPress={this.reset}>
//   Quiz
// </TextButton>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})
