import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
export default class Coin extends React.PureComponent {
    // toggle a todo as completed or not via update()
    render() {
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 8 }}>
        <Text>Coin: {this.props.name}</Text>
        <Text>USD Value: {this.props.usd}</Text>
        </View>
        </View>
      );
    }
}
