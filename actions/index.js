export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const APPEND_QUESTION = 'APPEND_QUESTION'

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}

export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    entry,
  }
}

export function appendQuestion ({ entryId, entry} ) {
  return {
    type: APPEND_QUESTION,
    title: entryId,
    entry
  }
}
