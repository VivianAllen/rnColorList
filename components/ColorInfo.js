import React from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import ColorTools from 'color'

const ColorInfo = ({ navigation }) => {

  const color = ColorTools(navigation.state.params.item.color)

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={[styles.text, { color: color.negate() }]}>
        {color.hex()}
      </Text>
      <Text style={[styles.text, { color: color.negate() }]}>
        {color.rgb().string()}
      </Text>
      <Text style={[styles.text, { color: color.negate() }]}>
        {color.hsl().string()}
      </Text>
    </View>
  )
  }

ColorInfo.navigationOptions = ({ navigation }) => {
  title: navigation.state.params.item.color
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    margin: 20
  },
})

export default ColorInfo
