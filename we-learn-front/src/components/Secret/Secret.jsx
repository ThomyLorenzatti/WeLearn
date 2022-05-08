import React from 'react';
import './Secret.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";

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
      url: 'http://10.101.49.122:8080' + '/secret',
      headers: {}, 
      data: {
        destination_wallet: this.state.address,
        lrn_amount: this.state.nb_token,
      }
    });
  }

  testfunction = () => {
    console.log("oui")
    var contractAddress = "0xb622d957Feb979b1E70D5e797C3A0eeE13BD5202";
    var targetAddress = "0x22D901E22203673903263E363062e6759E0632C8";
    var contractAbiFragment = [
      {
          "name" : "transfer",
          "type" : "function",
          "inputs" : [
            {
                "name" : "_to",
                "type" : "address"
            },
            {
                "type" : "uint256",
                "name" : "_tokens"
            }
          ],
          "constant" : false,
          "outputs" : [],
          "payable" : false
      }
    ];

    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    var contract = new ethers.Contract(contractAddress, contractAbiFragment, signer);
    var numberOfDecimals = 18;
    var numberOfTokens = ethers.utils.parseUnits('1.0', numberOfDecimals);
    contract.transfer(targetAddress, numberOfTokens).then(function(tx) {
        console.log(tx);
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
          <div class="btn" onClick={this.testfunction}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
              Test
          </div>
      </form>
      </div>
    );
  }
}