import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
export default class User extends React.PureComponent {

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 8 }}>
      <Text>User: {this.props.username}</Text>
      <Text>Balance: {this.props.balance}</Text>
      <Text>Btc: {this.props.btc}</Text>
      <Text>Eth: {this.props.eth}</Text>
      </View>
      </View>
    );
  }
}
