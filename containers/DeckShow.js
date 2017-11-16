import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { List } from "react-native-elements"
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { AppLoading} from 'expo'
import { purple, white } from '../utils/colors'
import TextButton from '../components/TextButton'

function AddCardBtn ({onPress }) {

  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => onPress()}>
        <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  )
}

class DeckShow extends React.Component {




  render() {
    const {title} = this.props.deck
    let cardCount = this.props.deck.questions.length

    return(
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>Number of cards: {cardCount}</Text>
        <AddCardBtn
          onPress={ () =>
            this.props.navigation.navigate(
              'CardNew',
              { entryId: this.props.entryId }
            )
          }/>
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
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
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
