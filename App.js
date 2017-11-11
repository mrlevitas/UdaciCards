import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'
import devToolsEnhancer from 'remote-redux-devtools'
import DeckIndex from './containers/DeckIndex'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger )
  )
)


// const store = createStore(reducer, devToolsEnhancer());


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <DeckIndex />
        </View>
      </Provider>
    );
  }
}
