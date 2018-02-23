import React from 'react';
import firebase from 'react-native-firebase';
import { FlatList, ScrollView, View, Text, TextInput, Button, Spinner } from 'react-native';
import Main from './Main'
import Login from './LoginForm'
import New from './New'

class Loading extends React.Component {
  constructor(){
    super();
    this.state = {
      Login: false,
      Main: false,
      New: false,
      uid: '',
      email: 'dudeperfect',
      name: '',
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({name: user.name})
        if (user.name == ''){
          this.setState({New: true})
        }
        else{
          this.setState({Main: true})
        }
      } else {
        this.setState({Login: true})
      }
    });
  }
  componentWillUnmount() {

  }
  render() {
    if(this.state.New){
      return <New />;
    }
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
      // <New />
      // <Text>Email:{this.state.email}</Text>

    );
  }
}
export default Loading;
