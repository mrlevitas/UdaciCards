import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList} from 'react-native'
import { List } from "react-native-elements"
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { white } from '../utils/colors'
import { AppLoading} from 'expo'

class DeckShow extends React.Component {

  render() {
    const {title} = this.props.deck
    let cardCount = this.props.deck.questions.length

    return(
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>Number of cards: {cardCount}</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

function mapStateToProps (state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    deck: state['entries'][entryId],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckShow)
