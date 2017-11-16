import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native'
import FieldInput from '../components/FieldInput'
import { Ionicons } from '@expo/vector-icons'
import TextButton from '../components/TextButton'
import { submitEntry, removeEntry, submitCard } from '../utils/api'
import { connect } from 'react-redux'
import { appendQuestion } from '../actions'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { Field, reduxForm, reset } from 'redux-form'


let validate = (formFields) => {
  const errors = {};

  if(!formFields.question) {
    errors['question'] = "Please enter a question!"
  }

  if(!formFields.answer) {
    errors['answer'] = "Please enter an answer!"
  }

  return errors
}

function SubmitBtn ({onPress}) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={(newTitle) => onPress(newTitle)}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

function createQuestion (question, answer) {
  return (
    {
      question: question,
      answer: answer
    }
  )
}

class CardNew extends Component {

  submitForm = (newData) => {
    const { dispatch, entryId } = this.props

    dispatch(appendQuestion({
      entryId,
      entry: newData
    }))

    this.cardQuestionRef.clear()
    this.cardAnswerRef.clear()

    submitCard({
      key: entryId,
      entry: newData
    })

    dispatch(reset('card'))
    this.toDeck()
  }

  toDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">

        <View >
          <Field
           name="question"
           label="Question"
           component={FieldInput}
           placeholder="Enter question here"
           refProp={ el => this.cardQuestionRef = el}
           />
           <Field
            name="answer"
            label="Answer"
            component={FieldInput}
            placeholder="Enter answer here"
            refProp={ el => this.cardAnswerRef = el}
            />
           <SubmitBtn onPress={handleSubmit(this.submitForm)}/>
        </View>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
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
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
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

export default connect(mapStateToProps)
    (reduxForm({
    form: 'card',
    validate
  })
(CardNew))
