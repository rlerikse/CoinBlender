import React from 'react';
import firebase from 'react-native-firebase';
import { FlatList, ScrollView, View, Text, TextInput, Button, Spinner } from 'react-native';
import Main from './Main'
import Login from './Login'

class New extends React.Component{
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      name: ''
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    });
  }
  componentWillUnmount(){

  }
  render() {
    if (!this.state.loggedIn){
      return <Login />;
    }
    return (
      <View>
      <TextInput
      label='Your Name'
      placeholder='First Last'
      value={user.name}
      onChangeText={name => this.setState({ name })}
      />
      </View>
    );
  }
}
export default New;
