import React, { Component } from 'react';
import CustomSelect from './customSelect';

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h1 className='home__hdg hdg hdg--1'>WebGL POC</h1>
        <CustomSelect />
      </div>
    );
  }
}

export default Home