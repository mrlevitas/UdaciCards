import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { RECEIVE_ENTRIES, ADD_ENTRY, APPEND_QUESTION} from '../actions'

function addToArray (array, entry) {
  return [
    ...array.slice(),
    entry
  ]
}

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries,
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    case APPEND_QUESTION :
      let newQuestions = addToArray(state[action.title]['questions'], action.entry)
      return {
        ...state,
        [action.title]: {
            ...state[action.title],
            questions : newQuestions
          }
      }
    default :
      return state
  }
}

export default combineReducers({
  form: formReducer,
  entries
})
