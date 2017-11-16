import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { green, red, white } from '../utils/colors'
import TextButton from '../components/TextButton'
import QuizResults from '../components/QuizResults'

function ChoiceBtn ({onPress, choiceStyle, choiceStr }) {
  return (
    <TouchableOpacity
      style={choiceStyle}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{choiceStr}</Text>
    </TouchableOpacity>
  )
}

class DeckQuiz extends React.Component {
  state = {
    index: 0,
    correctCount: 0
  }

  correct = () => {
    this.setState((prevState) => {
      return {
        index: prevState.index + 1,
        correctCount: prevState.correctCount + 1
        }
    })
  }

  incorrect = () =>{
    this.setState((prevState) => {
      return {
        index: prevState.index + 1
        }
    })
  }

  navBack = () =>{
    this.setState((prevState) => {
      return {
        index: 0,
        correctCount: 0
        }
    })
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { questions } = this.props.deck
    const { index, correctCount } = this.state
    const questionsLength = questions.length

    if (index === questionsLength && (questionsLength != 1 || index > 0) )
      return <QuizResults
                total={questionsLength}
                correct={correctCount}
                returnFunction={this.navBack}/>

    const qAhash = questions[index]
    debugger

    return(
      <View style={styles.container}>
        <Text>{(index + 1) + "/" + questionsLength}</Text>
        <Text style={styles.center}>{qAhash.question}</Text>
        <ChoiceBtn
          onPress={this.correct}
          choiceStyle={styles.correctBtn}/>
        <ChoiceBtn
          onPress={this.incorrect}
          choiceStyle={styles.incorrectBtn}/>
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
  correctBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  incorrectBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
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

export default connect(
  mapStateToProps,
)(DeckQuiz)
