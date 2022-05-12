import React, { useState } from 'react';
import './LessonContent.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import Loading from '../Loading/Loading.jsx';
import PDF from 'react-pdf-js';

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
  var contractAddress = "0x4Ac7dC42eD6A3e4D9b453FA9e303b010B4bb154c";
  var targetAddress = wallet_creator;
  var contractAbiFragment = [
    {
      "name": "transfer",
      "type": "function",
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "type": "uint256",
          "name": "_tokens"
        }
      ],
      "constant": false,
      "outputs": [],
      "payable": false
    }
  ];

  const provider = new ethers.providers.Web3Provider(web3.currentProvider);
  const signer = provider.getSigner();
  var contract = new ethers.Contract(contractAddress, contractAbiFragment, signer);
  var numberOfDecimals = 18;
  price = price.toString() + ".0";
  var numberOfTokens = ethers.utils.parseUnits(price, numberOfDecimals);
  contract.transfer(targetAddress, numberOfTokens).then(function (tx) {
    axios({
      method: 'post',
      url: API + '/buy_formation',
      headers: {},
      data: {
        formation_id: form_id,
        buyer_wallet: buyer_wallet,
      }
    });
  }).catch((err) => {
    console.log(err)
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
    this.onDocumentComplete = this.onDocumentComplete.bind(this);
    this.onPageCompleted = this.onPageCompleted.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  onDocumentComplete(pages) {
    this.setState({ page: 1, pages });
  }

  onPageCompleted(page) {
    this.setState({ page });
  }

  handlePrevious() {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext() {
    this.setState({ page: this.state.page + 1 });
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

  renderPagination(page, pages) {
    let previousButton = <>
      <div className="quizbtn" onClick={this.handlePrevious}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Previous
      </div>
    </>
    let nextButton = <>
      <div className="quizbtn" onClick={this.handleNext}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Next
      </div>
    </>
    return (
      <nav>
        <ul className="pager">
          {page !== 1 ? previousButton : null}
          {page !== pages ? nextButton : null}
        </ul>
      </nav>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
    if (this.state.lessonInfos.bought == false) {
      console.log(this.state.lessonInfos)
      return (
        <div class="col-sm-8 buying-page">
          <div class="article">
            <h1 class="article-title">You need to buy this formation to see it !</h1>
            <div class="buy-div">
              <p class="article-buy">{this.state.lessonInfos.name}</p>
              <p className="article-buy2">
                {this.state.lessonInfos.price}
                <img className="nav-tokens-img"
                  src="https://media.discordapp.net/attachments/972406713561001984/974278984017801256/LRNlogo.png"
                  alt="LRN"
                />
              </p>
            </div>
            <img class="article-img" src="https://static.vecteezy.com/system/resources/thumbnails/001/782/780/small/light-purple-pink-gradient-blur-backdrop-vector.jpg"></img>
            <button class="button-metamask buy" onClick={() => makeTransaction(this.state.lessonInfos.wallet_creator, this.state.lessonInfos.price, this.state.lessonInfos.id, this.state.buyer_wallet)}>
              Buy Formation
            </button>
          </div>
        </div>
      )
    } else {
      let pagination = null;
      if (this.state.pages) {
        pagination = this.renderPagination(this.state.page, this.state.pages);
      }
      return (
        <div class="article">
          <h1 class="article-title">{this.state.lessonInfos.name}</h1>
          <p></p>
          <div className='PdfCenter'>
            <PDF file={this.state.lessonInfos.pdf_link} onDocumentComplete={this.onDocumentComplete} onPageCompleted={this.onPageCompleted} page={this.state.page} />
          </div>
          {pagination}
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