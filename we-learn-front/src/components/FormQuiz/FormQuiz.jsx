import React from 'react';
import './FormQuiz.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_REACT_URL

async function connect() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
}

export default class FormQuiz extends React.Component {
  constructor(props) {
    super(props);
    var tab = window.location.href.split('/');
    this.state = {
      response1: "",
      response2: "",
      question1: "question 1",
      question2: "question 2",
      id: tab[tab.length - 1]
    };
    connect().then((r) => {
      axios({
        method: 'post',
        url: API + '/get-formation',
        headers: {}, 
        data: {
          wallet: r,
          formation_id: this.state.id,
        }
      }).then((res) => {
        console.log("aaaaa")
        console.log(res)
      });
    });
  }

  handleChangeResponse1 = (e) => {
    this.setState({ response1: e.target.value });
  };
  handleChangeResponse2 = (e) => {
    this.setState({ response2: e.target.value });
  };

  sendInfos = () => {
    var wallet = "";
    connect().then((r) => {
      wallet = r;
      axios({
        method: 'post',
        url: API + '/create-formation',
        headers: {}, 
        data: {
          wallet: wallet,
          formation_name: this.state.name,
          answer1: this.state.response1,
          answer2: this.state.response2,
        }
      });
    });
  }

  render() {
    return (
      <div class="login-box">
      <h2>Final Quiz</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" value={this.state.answer1} onChange={this.handleChangeResponse1}/>
          <label>{this.state.question1}</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="" value={this.state.answer2} onChange={this.handleChangeResponse2}/>
          <label>{this.state.question2}</label>
        </div>
          <div class="btn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
              Next
          </div>
      </form>
      </div>
    );
  }
}