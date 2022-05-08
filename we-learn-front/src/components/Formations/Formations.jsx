import React from 'react';
import './Formations.css';
import axios from 'axios';

const API = 'http://10.101.49.122:8080'

export default class Formations extends React.Component {
  constructor() {
    super();
    this.state = {
        all: {}
    };
  }

  async componentDidMount() {
    await axios.get(API + '/formations').then(res => {
       console.log(res);
       this.setState({ nb_bnb : res.data.bnb })
    })
}

  render() {
    return (
      <div>
        <h1>Test</h1>
      </div>
    );
  }
}