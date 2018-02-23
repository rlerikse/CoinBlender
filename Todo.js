import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
export default class User extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    render() {
        return (
          <TouchableHighlight
            onPress={() => this.toggleComplete()}
          >
              <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 8 }}>
                      <Text>{this.props.username}</Text>
                      <Text>{this.props.balance}</Text>
                  </View>
              </View>
          </TouchableHighlight>
        );
    }
}
