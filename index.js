import React, { Component } from 'react';

import { View, PanResponder, Animated } from 'react-native';

import PropTypes from 'prop-types';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.canReachEnd = true;
    this.totalWidth = 0;
    this.state = {
      offsetX: new Animated.Value(0),
      squareWidth: 0,
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return !this.canReachEnd;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return true;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.canReachEnd = true;
      },
      onPanResponderMove: (evt, gestureState) => {
        const margin = this.totalWidth - this.state.squareWidth * 1.025;
        if (gestureState.dx > 0 && gestureState.dx <= margin) {
          this.setState({ offsetX: new Animated.Value(gestureState.dx) });
        } else if (gestureState.dx > margin) {
          this.onEndReached();
          return;
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.resetBar();
        this.canReachEnd = true;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  onEndReached = () => {
    this.canReachEnd && this.props.onEndReached();
    this.canReachEnd = false;
    this.resetBar();
  };

  resetBar() {
    Animated.timing(this.state.offsetX, { toValue: 0 }).start();
  }

  render() {
    return (
      <View
        onLayout={event => {
          this.totalWidth = event.nativeEvent.layout.width;
        }}
        style={[this.props.containerStyle, { alignItems: 'flex-start' }]}
      >
        <Animated.View
          onLayout={event => {
            this.setState({ squareWidth: event.nativeEvent.layout.width });
          }}
          style={{ transform: [{ translateX: this.state.offsetX }] }}
          {...this._panResponder.panHandlers}
        >
          {this.props.sliderElement}
        </Animated.View>

        <View
          style={[
            { alignSelf: 'center', position: 'absolute', zIndex: -1 },
            this.props.childrenContainer,
          ]}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}

Slider.propTypes = {
  childrenContainer: PropTypes.object,
  containerStyle: PropTypes.object,
  sliderElement: PropTypes.element,
  onEndReached: PropTypes.func,
};

Slider.defaultProps = {
  childrenContainer: {},
  containerStyle: {},
  sliderElement: <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />,
  onEndReached: () => {},
};
