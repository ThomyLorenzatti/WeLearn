import React from 'react';
import './Secret.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";

const API = import.meta.env.VITE_REACT_URL

export default class Secret extends React.Component {
  constructor() {
    super();
    this.state = { 
      address: "",
      nb_token: 0
    };
  }

  handleChangeAddrress = (e) => {
    this.setState({ address: e.target.value });
  };
  handleChangeNumber = (e) => {
    this.setState({ nb_token: e.target.value });
  };

  sendRequest = () => {
    axios({
      method: 'post',
      url: API + '/secret',
      headers: {}, 
      data: {
        destination_wallet: this.state.address,
        lrn_amount: this.state.nb_token,
      }
    });
  }

  render() {
    return (
      <div class="login-box">
      <h2>Transfer Token</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" value={this.state.address} onChange={this.handleChangeAddrress}/>
          <label>Address</label>
        </div>
        <div class="user-box">
          <input type="number" name="" required="" value={this.state.number} onChange={this.handleChangeNumber}/>
          <label>Number of Learn</label>
        </div>
          <Link to='/' className="btn" onClick={this.sendRequest}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
              Send
          </Link>
      </form>
      </div>
    );
  }
}
