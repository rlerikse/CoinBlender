import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
export default class Coin extends React.PureComponent {
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
                      <Text>{this.props.name}</Text>
                      // <Text>{this.props.usd}</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                      {this.props.usd && (
                          <Text>COMPLETE</Text>
                      )}
                  </View>
              </View>
          </TouchableHighlight>
        );
    }
}
