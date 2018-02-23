import React from 'react';
import firebase from 'react-native-firebase';
import { FlatList, ScrollView, View, Text, TextInput, Button, ListView, StyleSheet, TouchableOpacity } from 'react-native';
import User from './User'
import Coin from './Coin'
import Loading from './Loading'
import LoginForm from './LoginForm'

class Main extends React.Component {

  constructor() {
    super();
    this.user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified, userdoc;
    this.uref = firebase.firestore().collection('users');
    this.mref = firebase.firestore().collection('markets');
    this.state = {
      textInput: '',
      loading: true,
      userInfo: [],
      loggedIn: true,
      markets: [],
      bitcoinusd: 0,
      ethereumusd: 0,
      // balance: 0,
    };
  }
  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  componentDidMount() {
    this.fetchMarkets();
    this.unsubscribe = this.uref.onSnapshot(this.onUserUpdate);
    this.unsubscribe2 = this.mref.onSnapshot(this.onMarketUpdate);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({email: user.email, uid: user.uid, name: user.name})

      } else {
        this.setState({loggedIn: false})
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribe2();
  }

  signOutUser(){
    this.setState({loggedIn: false, d: 'User Signed Out'});
    firebase.auth().signOut();
  }

  async fetchMarkets() {
    try {
      let response = await fetch('https://api.coinmarketcap.com/v1/ticker/');
      let responseJson = await response.json();
      this.setState({
        bitcoinusd: responseJson[0]['price_usd'],
        ethereumusd: responseJson[1]['price_usd'],
        // region: responseJson['result']['region']
      })
    } catch (err) {
      console.log(err);
    }

  }

  onUserUpdate = (querySnapshot) => {
    const userInfo = [];
    querySnapshot.forEach((doc) => {
      const { balance, username, active, btc, eth } = doc.data();
      if(this.user.uid == doc.id){
        userInfo.push({
          key: doc.id,
          doc, // DocumentSnapshot
          balance,
          username,
          active,
          btc,
          eth,
        });
      }
    });
    this.setState({
      userInfo,
      loading: false,
    });
  }

  onMarketUpdate = (querySnapshot) => {
    const markets = [];
    querySnapshot.forEach((doc) => {
      const { name, usd } = doc.data();
      markets.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        usd,
      });
    });
    this.setState({
      markets,
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
          data={this.state.userInfo}
          renderItem={({ item }) => <User {...item} />}
          />
        <View style={styles.container}>
          <Text>Test Balance: {this.user.uid}</Text>
          <Text>Bitcoin: {this.state.bitcoinusd}</Text>
          <Text>Ethereum: {this.state.ethereumusd}</Text>
          <TouchableOpacity style={styles.button} onPress={() => {
              this.fetchMarkets();
            }}>
            <Text>Refresh</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.markets}
          renderItem={({ item }) => <Coin {...item} />}
          />
        <Button
          title={'Sign Out'}
          onPress={() => this.signOutUser()}
          />
        <Text>Btc: {this.state.btcusd}</Text>
        <Text>User: {this.state.email}</Text>
        <Text>Uid: {this.state.uid}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
});
export default Main;
