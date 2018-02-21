import React from 'react';
import firebase from 'react-native-firebase';
import { FlatList, ScrollView, View, Text, TextInput, Button } from 'react-native';
import Todo from './Todo'
import Loading from './Loading'
import LoginForm from './LoginForm'

class Main extends React.Component {

  constructor() {
    super();
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified, userdoc;
    this.ref = firebase.firestore().collection('markets');
    this.state = {
      textInput: '',
      loading: true,
      todos: [],
      loggedIn: true,
      balance: 0,
    };
  }
  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({email: user.email, uid: user.uid})

      } else {
        this.setState({loggedIn: false})
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  signOutUser(){
    this.setState({loggedIn: false, d: 'User Signed Out'});
    firebase.auth().signOut();
  }

  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { name, usd } = doc.data();
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        usd,
      });
    });
    this.setState({
      todos,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return null; // or render a loading icon
    }
    if (!this.state.loggedIn){
      return <Loading />;
    }
    return (
      <View style={{ flex: 1 }}>
      <FlatList
      data={this.state.todos}
      renderItem={({ item }) => <Todo {...item} />}
      />
      <Button
      title={'Sign Out'}
      onPress={() => this.signOutUser()}
      />
      <Text>User: {this.state.email}</Text>
      <Text>Uid: {this.state.uid}</Text>
      <Text>Balance: {this.state.balance}</Text>
      </View>
    );
  }
}
export default Main;
