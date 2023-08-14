'use strict'
import React, { Component } from "react";
import PropTypes from "prop-types";

import {
 View,
 TouchableOpacity,
 Animated,
 Platform,
 Text,
} from "react-native";

import { ViewPropTypes } from 'deprecated-react-native-prop-types'
import S from './Style.js'

export default class FlipCard extends Component {
 static propTypes = {
  style: ViewPropTypes.style
 }

 constructor(props) {
  super(props)

  this.state = {
   isFlipped: false,
   isFlipping: false,
   rotate: new Animated.Value(Number(0)),
   mesured: false,
   face: { width: 0, height: 0 },
   back: { width: 0, height: 0 }
  }
 }

 static getDerivedStateFromProps(nextProps, prevState) {
  if (prevState.isFlipped !== nextProps.flip) {
   return { flip: nextProps.flip }
  } else return null
 }

 _toggleCard() {
  if (this.state.isFlipping) {
   return;
  }
  this.setState({ isFlipping: true });
  this._startContinuousRotation();
 }

 _startContinuousRotation() {
  this._rotateContinuously(); // Sürekli dönme işlemini başlat
  setTimeout(() => {
   this._stopContinuousRotation(); // 2 saniye sonra sürekli dönme işlemini durdur
  }, 1000);
 }

 _stopContinuousRotation() {
  clearInterval(this.continuousRotationInterval); // Sürekli dönme işlemini durdur
  this._animation(!this.state.isFlipped); // Yavaşlayarak dönme işlemini başlat
 }

 _rotateContinuously() {
  this.continuousRotationInterval = setInterval(() => {
   this._animation(!this.state.isFlipped); // Sürekli dönme işlemini gerçekleştir
  }, 120);
 }

 _animation(isFlipped) {
  if (!this.timer) {
   this.timer = setTimeout(() => {
    this.setState({ isFlipped: !this.state.isFlipped })
    this.timer = null
   }, 120)
  }
  Animated.spring(this.state.rotate,
   {
    toValue: Number(isFlipped),
    friction: this.props.friction,
    useNativeDriver: true
   }
  ).start((param) => {
   this.setState({ isFlipping: false })
  })
 }

 onPress = () => {
  if (this.state.isFlipping) {
   return;
  }
  this._toggleCard();
 };

 render() {
  var c = this.props.children;
  var transform = this.props.perspective ? [{ perspective: this.props.perspective }] : []
  var render_side = false
  transform.push(
   {
    rotateX: this.state.rotate.interpolate({
     inputRange: [0, 1],
     outputRange: ['0deg', '180deg']
    })
   }
  )

  if (this.state.isFlipped) {
   render_side = (
    <Back
     style={[this.state.height > 0 && { height: this.state.height }, this.state.width > 0 && { width: this.state.width }]}
     perspective={this.props.perspective}
     onLayout={(event) => {
      var { x, y, width, height } = event.nativeEvent.layout
      var _update = Object.assign(this.state.back, { width: width, height: height })
      this.setState({ back: _update })
     }}
    >
     {c[1]}
    </Back>
   )
  } else {
   render_side = (
    <Face
     style={[this.state.height > 0 && { height: this.state.height }, this.state.width > 0 && { width: this.state.width }]}
     onLayout={(event) => {
      var { x, y, width, height } = event.nativeEvent.layout;
      var _update = Object.assign(this.state.face, { width: width, height: height })
      this.setState({ face: _update })
     }}
    >
     {c[0]}
    </Face>
   )
  }

  let opacity = 1;
  return (
   <TouchableOpacity
    style={{ flex: 1 }}
    testID={this.props.testID}
    activeOpacity={1}
    onPress={this.onPress}
   >
    <Animated.View
     {...this.props}
     style={[
      S.flipCard,
      {
       transform,
       opacity,
      },
      this.props.style
     ]}
    >
     {render_side}
    </Animated.View>
   </TouchableOpacity>
  )
 }
}

FlipCard.defaultProps = {
 friction: 6,
 perspective: 1000,
}

export class Face extends Component {
 render() {
  return (
   <View
    style={[S.face, this.props.style]}
    onLayout={this.props.onLayout}
   >
    {this.props.children}
   </View>
  )
 }
}

export class Back extends Component {
 render() {
  var transform = []
  transform.push({ scaleY: -1 })
  if (Platform.OS === "android") {
   transform.push({ perspective: this.props.perspective })
  }

  return (
   <View
    style={[
     S.back,
     this.props.style,
     { transform: transform }
    ]}
    onLayout={this.props.onLayout}>
    {this.props.children}
   </View>
  )
 }
}

Back.defaultProps = {
 perspective: 1000,
}
