import React from 'react';
import firebase from 'react-native-firebase';
import Todos from './Todos'
import Login from './Login'
import { FlatList, ScrollView, View, Text, TextInput, Button } from 'react-native';
// Components to display when the user is LoggedIn and LoggedOut
// Screens for logged in/out - outside the scope of this tutorial
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
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
  render() {
    return <Login />;
  }
}
