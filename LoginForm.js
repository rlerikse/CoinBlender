import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import TitledInput from './TitledInput';
import Todos from './Todos'
import App from './App'
import Loading from './Loading'

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false, LoggedIn: false};
  onLoginPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => { this.setState({ error: 'Login Succesful', loading: false, LoggedIn:true }); })
    .catch((error) => {
      //Login was not successful, let's create a new account
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { this.setState({ error: 'Registered New Account', loading: false }); })
      .catch(() => {
        this.setState({ error: 'Authentication failed.', loading: false });
      });
    });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <Loading />;
    }
    return <Button onPress={this.onLoginPress.bind(this)} title="Log in" />;
  }
  render() {
    if (this.state.LoggedIn){
      return <App />;
    }
    return (
      <View>
      <TextInput
      label='Email Address'
      placeholder='you@domain.com'
      value={this.state.email}
      onChangeText={email => this.setState({ email })}
      />
      <TextInput
      label='Password'
      autoCorrect={false}
      placeholder='*******'
      secureTextEntry
      value={this.state.password}
      onChangeText={password => this.setState({ password })}
      />
      <Text style={styles.errorTextStyle}>{this.state.error}</Text>
      {this.renderButtonOrSpinner()}
      </View>
    );
  }
}
const styles = {
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
};

export default LoginForm;
