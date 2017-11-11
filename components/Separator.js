import React from 'react'
import { View } from 'react-native'

export default function renderSeparator () {
   return (
     <View
       style={{
         height: 1,
         width: "96%",
         backgroundColor: "#CED0CE",
         marginLeft: "2%",
         marginRight: "2%"
       }}
     />
   );
};
