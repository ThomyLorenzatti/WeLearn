import React from 'react';
import './LessonContent.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'http://10.101.49.122:8080'

async function connect() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
}

export default class LessonContent extends React.Component {
  constructor(props) {
    super();
    this.state = { 
      lessonInfos: [],
    };
  }

  async componentDidMount() {
    var wallet = "";
    var tab = window.location.href.split('/');
    wallet = await connect()
    await axios({
        method: 'post',
        url: API + '/get_formation',
        headers: {}, 
        data: {
          wallet: wallet,
          formation_id: tab[tab.length - 1],
        }
      }).then((res) => {
        this.setState({ lessonInfos: res.data })
      });
      console.log(this.state.lessonInfos);
  }

  render() {
    if (this.state.lessonInfos.buyed == false) {
      return (
        <div class="article">
          <h1 class="article-title">You need to buy this formation to see it !</h1>
          <div class="buy-div">
            <p class="article-buy">{this.state.lessonInfos.formation_name}</p>
            <p class="article-buy2">{this.state.lessonInfos.price} LRN</p>
          </div>
          <button class="button-metamask buy" onClick={() => connect(setUserAddress)}>
              Buy Formation
            </button>
      </div>
    )
    } else {
      return (
        <div class="article">
      <h1 class="article-title">{this.state.lessonInfos.formation_name}</h1>
        <img class="article-img" src="https://static.vecteezy.com/system/resources/thumbnails/001/782/780/small/light-purple-pink-gradient-blur-backdrop-vector.jpg"></img>
        <p class="article-content">{this.state.lessonInfos.content}</p>
      </div>
    )
  }
  }
}