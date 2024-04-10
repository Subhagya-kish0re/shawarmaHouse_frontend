import React, { Component } from "react";
import RINGS from "vanta/dist/vanta.rings.min";
import * as THREE from "three";

class RingsEffect extends Component {
  constructor() {
    super();
    this.vantaRef = React.createRef();
  }

  componentDidMount() {
    // Function to check if the device is a mobile device
    const isMobile = () => window.innerWidth <= 768;

    // Adjusting properties based on device type
    const adjustedProperties = {
      el: this.vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: isMobile() ? 100.0 : 200.0,
      minWidth: isMobile() ? 100.0 : 200.0,
      color: 0xffffff,
      backgroundColor: 0x000000,
      points: isMobile() ? 10 : 15,
      maxDistance: isMobile() ? 10 : 20,
      spacing: isMobile() ? 5 : 10,
    };

    this.vantaEffect = RINGS(adjustedProperties);
  }

  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  render() {
    return (
      <div
        style={{ height: "100vh", width: "100%", position: "relative" }}
        ref={this.vantaRef}
      >
        {this.props.children}
      </div>
    );
  }
}

export default RingsEffect;
