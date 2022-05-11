import React from 'react';
import './Form.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading.jsx';
import Success from '../Success/Success.jsx';

const API = import.meta.env.VITE_REACT_URL

async function connect() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
}

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = { 
      name: "",
      number: 0,
      content: "",
      quiz: 0,
      question1: "",
      response1: "",
      question2: "",
      response2: "",

      loading: false,
      success: false,
      successTitle: "",
    };
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleChangeNumber = (e) => {
    this.setState({ number: e.target.value });
  };
  handleChangeContent = (e) => {
    this.setState({ content: e.target.value });
  };
  changePage = () => {
    if (this.name != "" && this.content != "")
      this.setState({ quiz: 1 });
  }
  handleChangeQuestion1 = (e) => {
    this.setState({ question1: e.target.value });
  };
  handleChangeQuestion2 = (e) => {
    this.setState({ question2: e.target.value });
  };
  handleChangeResponse1 = (e) => {
    this.setState({ response1: e.target.value });
  };
  handleChangeResponse2 = (e) => {
    this.setState({ response2: e.target.value });
  };

  sendInfos = () => {
    this.setState({ loading: true });
    var wallet = "";
    connect().then((r) => {
      wallet = r;
      console.log("connected")
      axios({
        method: 'post',
        url: API + '/create-formation',
        headers: {}, 
        data: {
          wallet: wallet,
          formation_name: this.state.name,
          price: this.state.number,
          content: this.state.content,
          question1: this.state.question1,
          answer1: this.state.response1,
          question2: this.state.question2,
          answer2: this.state.response2,
        }
      }).then((res) => {
        if (res.status == 200) {
          this.setState({ successTitle: res.data })
        }
        this.setState({ success: true })
        this.setState({ loading: false })
      });
    });
  }

  render() {
    if (this.state.success) {
      return(
        <Success title={this.state.successTitle}/>
      )
    }
    if (this.state.loading) {
      return(
        <Loading/>
      )
    }
    if (this.state.quiz == 0) {
      return (
        <div class="login-box">
        <h2>Create Formation</h2>
        <form>
          <div class="user-box">
            <input type="text" name="" required="" value={this.state.name} onChange={this.handleChangeName}/>
            <label>Name</label>
          </div>
          <div class="user-box">
            <input type="number" name="" required="" value={this.state.number} onChange={this.handleChangeNumber}/>
            <label>Price (in Learn)</label>
          </div>
          <div class="user-box">
            <input type="text" name="" required="" value={this.state.content} onChange={this.handleChangeContent}/>
            <label>Content of your formation</label>
          </div>
          <div className='centerBtn'>
            <div class="btn" onClick={this.changePage}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
                Next
            </div>
          </div>
        </form>
        </div>
      );
    } else {
      return (
        <div class="login-box">
        <h2>Make a quiz</h2>
        <form>
          <div class="user-box">
            <input type="text" name="" required="" value={this.state.question1} onChange={this.handleChangeQuestion1}/>
            <label>Question 1</label>
          </div>
          <div class="user-box">
            <input type="text" name="" required="" value={this.state.response1} onChange={this.handleChangeResponse1}/>
            <label>Response 1</label>
          </div>
          <div class="user-box">
            <input type="text" name="" required="" value={this.state.question2} onChange={this.handleChangeQuestion2}/>
            <label>Question 2</label>
          </div>
          <div class="user-box">
            <input type="text" name="" required="" value={this.state.response2} onChange={this.handleChangeResponse2}/>
            <label>Response 2</label>
          </div>
          <div className='centerBtn'>
          <div className="btn" onClick={this.sendInfos}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
                Submit
            </div>
            </div>
        </form>
        </div>
      );
    }
  }
}