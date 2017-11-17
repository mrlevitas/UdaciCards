import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native'
import FieldInput from '../components/FieldInput'
import { Ionicons } from '@expo/vector-icons'
import TextButton from '../components/TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { Field, reduxForm, reset } from 'redux-form'


let validate = (formFields) => {
  const errors = {};

  if(!formFields.title) {
    errors['title'] = "Please enter a Deck title!"
  }

  return errors
}

function SubmitBtn ({onPress}) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={(newTitle) => onPress(newTitle)}>
        <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  )
}

function createBlankEntry ( title ) {
  return (
    {
      title: title,
      questions: []
    }
  )
}

class DeckNew extends Component {

  submitForm = (newTitle) => {
    const { title } = newTitle
    const { dispatch } = this.props
    const entry = createBlankEntry(title)

    dispatch(addEntry({
      [title]: entry
    }))

    submitEntry({ key: title, entry })

    this.toShow(title)

    dispatch(reset('deck'))
    this.deckFieldRef.clear()
  }

  toShow = (title) => {
    this.props.navigation.navigate(
      'DeckShow',
      { entryId: title }
    )
  }
  render() {
    const { handleSubmit } = this.props

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">

        <View >
          <Field
           name="title"
           label="New Deck"
           component={FieldInput}
           placeholder="Deck Name here"
           refProp={ el => this.deckFieldRef = el}
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

export default reduxForm({
  form: 'deck',
  validate
})(DeckNew)
