import React, { Component } from "react";
import RINGS from "vanta/dist/vanta.rings.min";
import * as THREE from "three";

class RingsEffect extends Component {
  constructor() {
    super();
    this.vantaRef = React.createRef();
  }

  componentDidMount() {
    this.vantaEffect = RINGS({
      el: this.vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      color: 0xffffff,
      backgroundColor: 0x000000,
      points: 15,
      maxDistance: 20,
      spacing: 10,
    });
  }

  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }} ref={this.vantaRef}>
        {this.props.children}
      </div>
    );
  }
}

export default RingsEffect;
