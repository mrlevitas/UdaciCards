import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList} from 'react-native'
import { List } from "react-native-elements"
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { getDecks } from '../utils/api'
import { white } from '../utils/colors'
import { AppLoading} from 'expo'
import DeckListItem from '../components/DeckListItem'
import renderSeparator from '../components/Separator'
import { } from '../utils/helpers'

class DeckIndex extends React.Component {
  state = {
    ready: false
  }
  renderSeparator = renderSeparator

  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveEntries(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  _keyExtractor = (item) => item.title

  renderItem = ( {item} ) => (
    <DeckListItem data={item} navFun={() =>
      this.props.navigation.navigate(
        'DeckShow',
        { entryId: item.title }
      )} />
  )

  render() {
    const { entries } = this.props
    const { ready } = this.state

    let decks = Object.values(entries['entries'])

    if (ready === false) {
      return <AppLoading />
    }
    return (
      <View>
        <View style={styles.container}>
          <Text style={{fontSize: 24}}>Decks</Text>
        </View>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={decks}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
            />
        </List>
      </View>
    )
  }
}

function mapStateToProps (entries) {
  return {
    entries
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(
  mapStateToProps,
)(DeckIndex)
