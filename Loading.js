import React from 'react';
import firebase from 'react-native-firebase';
import { FlatList, ScrollView, View, Text, TextInput, Button, Spinner } from 'react-native';
import Main from './Main'
import Login from './LoginForm'

class Loading extends React.Component {
  constructor(){
    super();
    this.state = {
      Login: false,
      Main: false,
      uid: '',
      email: 'dudeperfect',
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({Main: true, email: user.email})

      } else {
        this.setState({Login: true})
      }
    });
  }
  componentWillUnmount() {

  }
  render() {
    if(this.state.Main){
      return <Main />;
    }
    if(this.state.Login){
      return <Login />;
    }
    return(
      // <View style={styles.spinnerStyle}>
      // <Spinner size="large" />
      // </View>
      <Text>Loading...</Text>
      // <Text>Email:{this.state.email}</Text>

    );
  }
}
export default Loading;
