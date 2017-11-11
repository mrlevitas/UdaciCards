import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem } from "react-native-elements"
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
import TextButton from './TextButton'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'

export default function Deck ({ data }) {
  let cardCount = data.questions.length
  return (
    <ListItem
      containerStyle={{ borderBottomWidth: 0 }}
      title={data.title}
      rightTitle={cardCount.toString()}
      >
        <Text>
          {}
        </Text>
    </ListItem>
  )
}

// <TextButton style={{margin: 20}} onPress={this.reset}>
//   Quiz
// </TextButton>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
})
