import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList} from 'react-native'
import { List } from "react-native-elements"
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { white } from '../utils/colors'
import { AppLoading} from 'expo'
// import Deck from '../components/Deck'


class DeckShow extends React.Component {


  render() {
    return(
      <View>
        <Text>{this.props.deck}</Text>
      </View>
  )
  }
}
function mapStateToProps (state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    deck: state[entryId],
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
