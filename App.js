import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'
import devToolsEnhancer from 'remote-redux-devtools'
import DeckIndex from './containers/DeckIndex'
import DeckNew from './containers/DeckNew'
import DeckShow from './containers/DeckShow'
import DeckQuiz from './containers/DeckQuiz'
import CardNew from './containers/CardNew'
import { setLocalNotification } from './utils/helpers'

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

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckIndex,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  DeckNew: {
    screen: DeckNew,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const cardCreateStack = StackNavigator({
  DeckShow: {
    screen: DeckShow,
  },
  CardNew: {
    screen: CardNew,
  },
  DeckQuiz: {
    screen: DeckQuiz,
  }
},{ headerMode: 'none' })

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckShow: {
    screen: cardCreateStack,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }

},{headerMode: 'screen'})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
