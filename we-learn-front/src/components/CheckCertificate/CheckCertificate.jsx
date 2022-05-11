import React from 'react';
import './CheckCertificate.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_REACT_URL

async function connect() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
}

export default class CheckCertificate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressToVerify: "",
      allCertificates: [],
    };
  }
  
  async componentDidMount() {
  }

  handleChangeAddress = (e) => {
    this.setState({ addressToVerify: e.target.value });
  };

  sendAddress = () => {
    var wallet = "";

    connect().then((r) => {
      wallet = r;
      axios({
        method: 'post',
        url: API + '/check-certificates',
        headers: {}, 
        data: {
          addressToVerify: this.state.addressToVerify,
        }
      }).then((res) => {
        this.setState({ allCertificates: res.data.data })
      });
    });
  }

  render() {
    return (
      <div class="login-box">
      <h2>Verify User Certificates</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" value={this.state.addressToVerify} onChange={this.handleChangeAddress}/>
          <label>User Address</label>
        </div>
          <button className="btn" onClick={this.sendAddress} disabled="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
              Verify
          </button>
      </form>
      </div>
    );
  }
  }