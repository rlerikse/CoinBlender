import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Amplify, { Auth } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

export default class App extends React.Component {
  state = { // 1
    authCode: ''
  }
  onChangeText(authCode) { // 2
    this.setState({ authCode })
  }
  signUp() {
    Auth.signUp({ // 3
      username: 'redg',
      password: 'Password12@',
      attributes: {
        phone_number: '+13136800062',
        email: 'reggiedillingham@gmail.com'
      }
    })
    .then(res => {
      console.log('successful signup: ', res)
    })
    .catch(err => {
      console.log('error signing up: ', err)
    })
  }
  confirmUser() { // 4
    const { authCode } = this.state
    Auth.confirmSignUp('myCoolUsername', authCode)
      .then(res => {
        console.log('successful confirmation: ', res)
      })
      .catch(err => {
        console.log('error confirming user: ', err)
      })
  }
  render() {
    return (
      <View style={styles.container}>
      <Button title='Sign Up' onPress={this.signUp.bind(this)} />
      <TextInput
        placeholder='Input Code'
        onChangeText={value => this.onChangeText(value)}
        style={styles.input}
      />
      <Button
        title='Confirm User'
        onPress={this.confirmUser.bind(this)}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
})
