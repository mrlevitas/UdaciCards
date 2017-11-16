import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.submitBtnText, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})
