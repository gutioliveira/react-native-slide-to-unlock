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
        this.onSlideStart();
        this.canReachEnd = true;
      },
      onPanResponderMove: (evt, gestureState) => {
        if(!this.props.disableSliding) {
          const margin = this.totalWidth - this.state.squareWidth * 1.025;
          if (gestureState.dx > 0 && gestureState.dx <= margin) {
            this.state.offsetX.setValue(gestureState.dx)
          } else if (gestureState.dx > margin) {
            this.onEndReached();
            return;
          }
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState) => {
        this.onSlideEnd(); 
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.onSlideEnd();
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

  onSlideStart = () => {
    this.props.onSlideStart();
  };

  onSlideEnd = () => {
    this.props.onSlideEnd();
  };

  resetBar() {
    Animated.timing(this.state.offsetX, { toValue: 0, useNativeDriver: true }).start();
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
  onSlideStart: PropTypes.func,
  onSlideEnd: PropTypes.func,
  disableSliding: PropTypes.bool,
};

Slider.defaultProps = {
  childrenContainer: {},
  containerStyle: {},
  sliderElement: <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />,
  onEndReached: () => {},
  onSlideStart: () => {},
  onSlideEnd: () => {},
  disableSliding: false
};
