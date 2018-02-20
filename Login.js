import React from 'react';
import firebase from 'react-native-firebase';
import Todos from './Todos'
import { FlatList, ScrollView, View, Text, TextInput, Button } from 'react-native';
// Components to display when the user is LoggedIn and LoggedOut
// Screens for logged in/out - outside the scope of this tutorial
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      email: '',
      password: '',
    };
  }
  // updateTextInput(value) {
  //   this.setState({ textInput: value });
  // }
  /**
  * When the App component mounts, we listen for any authentication
  * state changes in Firebase.
  * Once subscribed, the 'user' parameter will either be null
  * (logged out) or an Object (logged in)
  */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,

      });
    });
  }
  /**
  * Don't forget to stop listening for authentication state changes
  * when the component unmounts.
  */
  componentWillUnmount() {
    this.authSubscription();
  }

  onRegister() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
  }
  render() {
    return (<View style={{ flex: 1 }}>
      <TextInput
      placeholder={'email'}
      onChangeText={(email) => this.setState({email})}
      />
      <TextInput
      placeholder={'password'}
      onChangeText={(password) => this.setState({password})}
      />
      <Button
      title={'Login/Register'}
      onPress={() => this.onRegister()}
      />
      </View>);
    }
  }
