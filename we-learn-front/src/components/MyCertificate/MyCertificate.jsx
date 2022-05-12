import React from 'react';
import './MyCertificate.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_REACT_URL

async function connect() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
}

export default class MyCertificate extends React.Component {
  constructor() {
    super();
    this.state = {
        certificates: [],
        keys: []
    };
  }

  async componentDidMount() {
    var wallet = await connect()
    await axios.get(API + '/get_my_certificate/' + wallet).then(res => {
       console.log(res);
       this.setState({ keys: res.data.data.keys })
       this.setState({ certificates: res.data.data.certificates })
    })
}
  render() {
    return (
    <div class="col-sm-8 cards-div">
        <span>Keys</span>
        {this.state.keys.map(item => {
            return (
            <div class="col-md-4 card-div">
                <div class="blog-card blog-card-blog">
                <div class="blog-card-image">
                    <a href="#" class="img-a"> <img class="img" src="https://static.vecteezy.com/system/resources/thumbnails/001/782/780/small/light-purple-pink-gradient-blur-backdrop-vector.jpg"></img> </a>
                    <div class="ripple-cont"></div>
                </div>
                <div class="blog-table">
                    {/* <h6 class="blog-category blog-text-success"><i class="fas fa-blog"></i>{item.price}</h6> */}
                    <h4 class="blog-card-caption">
                    <Link to={'/lesson/' + item.id} className="title-formation">
                        {item.nft_contract}
                    </Link>
                    </h4>
                    <p class="blog-card-description"></p>
                    </div>
                </div>
            </div>);
        })}
        <span>Certificates</span>
        {this.state.certificates.map(item => {
            return (
            <div class="col-md-4 card-div">
                <div class="blog-card blog-card-blog">
                <div class="blog-card-image">
                    <a href="#" class="img-a"> <img class="img" src="https://static.vecteezy.com/system/resources/thumbnails/001/782/780/small/light-purple-pink-gradient-blur-backdrop-vector.jpg"></img> </a>
                    <div class="ripple-cont"></div>
                </div>
                <div class="blog-table">
                    {/* <h6 class="blog-category blog-text-success"><i class="fas fa-blog"></i>{item.price}</h6> */}
                    <h4 class="blog-card-caption">
                    <Link to={'/lesson/' + item.id} className="title-formation">
                        {item.ntt_contract}
                    </Link>
                    </h4>
                    <p class="blog-card-description"></p>
                    </div>
                </div>
            </div>);
        })}
    </div>
    );
  }
}