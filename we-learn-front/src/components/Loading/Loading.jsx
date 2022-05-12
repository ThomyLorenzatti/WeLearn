import React from 'react';
import './Loading.css';

export default class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Your request is navigating through the Blockchain"
    };
  }

  render() {
    return (
      <div id="loading-wrapper">
        <div id="loading-text">{this.state.title}</div>
        <div id="loading-content"></div>
      </div>
    );
  }
}