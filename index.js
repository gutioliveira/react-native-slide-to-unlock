import React, {Component} from 'react';

import {
  View,
  PanResponder,
  Animated,
} from 'react-native';

import { t } from 'typy'

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.canReachEnd = true;
    this.totalWidth = 0;
    this.state = {
      offsetX: new Animated.Value(0),
      squareWidth: 0
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return !this.canReachEnd;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if ( gestureState.dx > 0 && gestureState.dx < this.totalWidth - this.state.squareWidth )
          this.setState({offsetX: new Animated.Value(gestureState.dx)});
        else if ( !(gestureState.dx < this.totalWidth - this.state.squareWidth) ){
          this.onEndReached();
          return;
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.resetBar();
        this.canReachEnd = true
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true
    });
  }

  onEndReached = () => {
    this.canReachEnd && t(this.props, 'onEndReached').safeFunction();
    this.canReachEnd = false;
    this.resetBar();
  };

  resetBar(){
    Animated.timing(
      this.state.offsetX,
      { toValue: 0 }
    ).start()
  };

  render() {

    return (
      <View
    onLayout={ (event) => {
      // if ( this.state.totalWidth > 0 )
      //     return
      this.totalWidth = event.nativeEvent.layout.width;
    }}
    style={[this.props.containerStyle, {alignItems: 'flex-start'}]}
  >
  <Animated.View
    onLayout={ (event) => {
      this.setState({squareWidth: event.nativeEvent.layout.width})
    }}
    style={{transform: [{translateX: this.state.offsetX}] }}
    {
    ...this._panResponder.panHandlers
    }
  >
    {
      this.props.sliderElement || <View style={{width: 50, height: 50, backgroundColor: 'green'}}/>
    }
  </Animated.View>

    <View style={[{alignSelf: 'center', position: 'absolute', zIndex: -1}, this.props.childrenContainer]}>
    {
      this.props.children
    }
  </View>
    </View>
  );
  }
}
