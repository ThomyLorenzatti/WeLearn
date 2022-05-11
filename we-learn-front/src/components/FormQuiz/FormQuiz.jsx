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
    this.state = {
      lessonInfos: [],
      response1: "",
      response2: "",
      disable: true
    };
  }
  
  async componentDidMount() {
    var tab = window.location.href.split('/');
    var wallet = "";

      connect().then((r) => {
        wallet = r;
        axios({
          method: 'post',
          url: API + '/get_formation',
          headers: {}, 
          data: {
            wallet: wallet,
            formation_id: tab[tab.length - 1],
          }
        }).then((res) => {
          this.setState({ lessonInfos: res.data.data })
        });
      });
  }

  handleChangeResponse1 = (e) => {
    this.setState({ response1: e.target.value });
    if (this.state.response1 == this.state.lessonInfos.answer1 &&
      this.state.response2 == this.state.lessonInfos.answer2)
        this.setState({disable: false})
  };
  handleChangeResponse2 = (e) => {
    this.setState({ response2: e.target.value });
    if (this.state.response1 == this.state.lessonInfos.answer1 &&
      this.state.response2 == this.state.lessonInfos.answer2)
        this.setState({disable: false})
  };

  sendAnwser = () => {
    var wallet = "";
    var tab = window.location.href.split('/');

    connect().then((r) => {
      wallet = r;
      axios({
        method: 'post',
        url: API + '/finish_formation',
        headers: {}, 
        data: {
          buyer_wallet: wallet,
          formation_id: tab[tab.length - 1],
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
          <input type="text" name="" required="" value={this.state.response1} onChange={this.handleChangeResponse1}/>
          <label>{this.state.lessonInfos.question1}</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="" value={this.state.response2} onChange={this.handleChangeResponse2}/>
          <label>{this.state.lessonInfos.question2}</label>
        </div>
          <div className='centerBtn'>

          <button className="btn" onClick={this.sendAnwser} disabled={this.state.disable}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
              Submit
          </button>
          </div>
      </form>
      </div>
    );
  }
}