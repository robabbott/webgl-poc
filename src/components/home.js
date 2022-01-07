import React, { Component } from 'react';
import CustomSelect from './customSelect';
import logo from '../images/bright-ai-logo.png'

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h1 className='hdg hdg--1'>WebGL POC</h1>
        <CustomSelect />
      </div>
    );
  }
}

export default Home