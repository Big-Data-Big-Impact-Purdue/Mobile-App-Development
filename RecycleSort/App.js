import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

import API, { graphqlOperation } from '@aws-amplify/api'

const listPets = `
  query {
    listPet {
      items {
        id
        name
        description
      }
    }
 }
`
const createPet = `
  mutation($name: String!, $description: String) {
    createPet(input: {
      name: $name
      description: $description
  }) {
    id
    name
    description
  }
}`

class App extends React.Component {
  state = { name: '', description: '', pets: [] }
  async componentDidMount() {
    try {
      const graphqldata = await API.graphql(graphqlOperation(listPets))
      console.log('graphqldata:', graphqldata)
      this.setState({ pets: graphqldata.data.listPet.items })
    } catch (err) {
      console.log('error: ', err)
    }
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  createPet = async () => {
    const pet = this.state
    if (pet.name === '' || pet.description === '') return
    const pets = [...this.state.pets, pet]
    this.setState({ pets, name: '', description: '' })
    try {
      await API.graphql(graphqlOperation(createPet, pet))
      console.log('pet successfully created.')
    } catch (err) {
      console.log('error creating pet...', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText('name', val)}
          placeholder="Pet Name"
          value={this.state.name}
        />
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText('description', val)}
          placeholder="Pet Description"
          value={this.state.description}
        />
        <Button onPress={this.createPet} title="Add Pet" />
        {
          this.state.pets.map((pet, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={styles.description}>{pet.description}</Text>
            </View>
          ))
        }
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  input: {
    height: 45, borderBottomWidth: 2, borderBottomColor: 'black', marginVertical: 10
  },
  item: {
    borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10
  },
  name: { fontSize: 16 },
  description: { color: 'rgba(0, 0, 0, .5)' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50
  },
});
