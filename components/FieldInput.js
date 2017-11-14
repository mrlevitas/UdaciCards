import React, {Component} from 'react';
import {TextInput ,Text} from 'react-native'
import { FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import { View } from 'react-native'

class FieldInput extends Component {
  render(){
    const { input, label, placeholder, name, meta: { touched, error } , refProp} = this.props
    return (
      <View>
        <View>
          <Text>{label}</Text>
          <TextInput
            autoCorrect={false}
            ref={refProp}
            style={{height: 40}}
            {...input}
            name={name}
            placeholder={placeholder}
           />
          {touched && error && <FormValidationMessage>{error}</FormValidationMessage>}
        </View>
      </View>
    );
  }

}


export default FieldInput;
