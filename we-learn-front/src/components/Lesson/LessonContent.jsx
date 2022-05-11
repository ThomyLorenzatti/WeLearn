import React from 'react';
import './LessonContent.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import Loading from '../Loading/Loading.jsx';

const API = import.meta.env.VITE_REACT_URL

async function connect() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
}

function makeTransaction(wallet_creator, price, form_id, buyer_wallet) {
  if (wallet_creator === undefined)
    return;
  var contractAddress = "0xf292c0b21F4a583fAD962EDeF15DBE76F3606c1A";
  var targetAddress = wallet_creator;
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
  price = price.toString() + ".0";
  var numberOfTokens = ethers.utils.parseUnits('10.0', numberOfDecimals);
  console.log(numberOfTokens)
  contract.transfer(targetAddress, numberOfTokens).then(function(tx) {
      console.log(tx);
  });

  console.log(buyer_wallet)
  axios({
    method: 'post',
    url: API + '/buy_formation',
    headers: {}, 
    data: {
      formation_id: form_id,
      buyer_wallet: buyer_wallet,
    }
  });
}

export default class LessonContent extends React.Component {
  constructor(props) {
    super(props);
    var tab = window.location.href.split('/');
    this.state = { 
      lessonInfos: [],
      loading: true,
      lesson_id: tab[tab.length - 1],
      buyer_wallet: "",
    };
  }

  async componentDidMount() {
    var wallet = "";
    wallet = await connect()
    await axios({
      method: 'get',
      url: API + "/formations/" + this.state.lesson_id + '/' + wallet,
      headers: {},
    }).then((res) => {
      this.setState({ lessonInfos: res.data.data })
    });
    this.setState({ loading: false })
    this.setState({ buyer_wallet: wallet })
  }


  render() {
    if (this.state.loading) {
      return(
        <Loading/>
      )
    }
    if (this.state.lessonInfos.bought == false) {
      console.log(this.state.lessonInfos)
      return (
        <div class="article">
          <h1 class="article-title">You need to buy this formation to see it !</h1>
          <div class="buy-div">
            <p class="article-buy">{this.state.lessonInfos.name}</p>
            <p class="article-buy2">{this.state.lessonInfos.price} LRN</p>
          </div>
          <button class="button-metamask buy" onClick={() => makeTransaction(this.state.lessonInfos.wallet_creator, this.state.lessonInfos.price, this.state.lessonInfos.id, this.state.buyer_wallet)}>
            Buy Formation
          </button>
      </div>
    )
    } else {
      return (
      <div class="article">
        <h1 class="article-title">{this.state.lessonInfos.name}</h1>
        <img class="article-img" src="https://static.vecteezy.com/system/resources/thumbnails/001/782/780/small/light-purple-pink-gradient-blur-backdrop-vector.jpg"></img>
        <p class="article-content">{this.state.lessonInfos.content}</p>
        <div className="rightBtn">
          <Link to={'/final-quiz/' + this.state.lesson_id}>
            <div className="quizbtn">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Final Quiz
            </div>
          </Link>
        </div>
      </div>
    )
  }
  }
}