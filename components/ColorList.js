import React, { Component } from 'react'

import {
  AsyncStorage,
  FlatList,
  StyleSheet,
} from 'react-native'

import PropTypes from 'prop-types'

import ColorButton from './ColorButton'
import ColorForm from './ColorForm'


export default class ColorList extends Component {

  static navigationOptions  = {
    title: 'Available Colors'
  }

  constructor() {
    super()

    const availableColors = []

    this.state = {
      availableColors,
    }

    this.newColor = this.newColor.bind(this)
  }

  componentDidMount() {
    AsyncStorage.getItem(
      '@ColorListStore:Colors',
      (err, data) => {
        if (err) {
          console.error('Error loading colors', err)
        } else {
          const availableColors = JSON.parse(data) || []
          this.setState({
            availableColors
          })
        }
      }
    )
  }

  saveColors(colors) {
    AsyncStorage.setItem(
      '@ColorListStore:Colors',
      JSON.stringify(colors)
    )
  }

  newColor(color) {
    const availableColors = [
      ...this.state.availableColors,
      {
        key: (this.state.availableColors.length + 1).toString(),
        color: color
      }
    ]
    this.setState({
      availableColors: availableColors
    })
    this.saveColors(availableColors)
  }

  render() {

    const { navigate } = this.props.navigation

    const { backgroundColor, availableColors } = this.state

    return (
      <FlatList style={[styles.container, {backgroundColor}]}
      data={availableColors}
      renderItem={ ({item}) => (
        <ColorButton backgroundColor={item.color}
        onSelect={() => navigate('Details', { item })}/>
      )}
      ListHeaderComponent={() => (
        <ColorForm onNewColor={this.newColor}/>
      )}>
      </FlatList>
    )
  }
}

ColorList.propTypes = {
  onColorSelected: PropTypes.func
}

ColorList.defaultProps = {
  onColorSelected: f => f
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'lightgrey',
    padding: 10,
    fontSize: 30,
    textAlign: 'center'
  }
})
