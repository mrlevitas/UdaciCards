import React, { Component } from 'react'
import { View, FlatList} from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { getDecks } from '../utils/api'
import { white } from '../utils/colors'
import { AppLoading} from 'expo'
import Deck from '../components/Deck'
import { } from '../utils/helpers'

class DeckIndex extends React.Component {
  state = {
    ready: false
  }

  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveEntries(decks)))
      .then((decks) => console.log(decks))
      .then(() => this.setState(() => ({ready: true})))
  }

  _keyExtractor = (item) => item.title

  renderItem = ( {item} ) => (
    <Deck data={item}/>
  )

  render() {
    const { entries } = this.props
    const { ready } = this.state

    let mappedDecks = Object.values(entries)

    if (ready === false) {
      return <AppLoading />
    }
    return (
      <View>
        <FlatList
          data={mappedDecks}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}/>
      </View>
    )
  }
}

function mapStateToProps (entries) {
  return {
    entries
  }
}

export default connect(
  mapStateToProps,
)(DeckIndex)
