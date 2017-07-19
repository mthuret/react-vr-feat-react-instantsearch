import React from 'react';
import { asset, Image, View, VrButton, Text } from 'react-vr';

class Button extends React.Component {
  onButtonClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          margin: 0.1,
          width: 0.7,
        }}
      >
        <VrButton onClick={this.onButtonClick}>
          <Image
            style={{
              width: 0.7,
              height: 0.7,
            }}
            source={{ uri: this.props.src }}
          />
          <Text style={{ textAlign: 'center' }}>
            {this.props.name} - {this.props.price} euros
          </Text>
          <Text style={{ textAlign: 'center' }}>
            {this.props.room_type} - {this.props.city},{this.props.country}
          </Text>
        </VrButton>
      </View>
    );
  }
}

export default Button;
