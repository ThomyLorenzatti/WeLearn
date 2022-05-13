import React from 'react';
import './CheckCertificate.css';
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

export default class CheckCertificate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCertificates: [],
      address: "",
      submitted: false
    };
  }

  handleChangeAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  sendAnwser = () => {
    axios({
      method: 'get',
      url: API + '/get_certificate/' + this.state.address,
      headers: {},
    }).then((res) => {
      this.setState({ allCertificates: res.data.data })
      this.setState({ submitted: true })
      console.log(this.state.allCertificates)
    });
  }

  drawMap(map) {
    if (map.length == 0)
      return (
        <div>
          <span className='not_found'>No Items Found</span>
        </div>
      )
    else {
      return (
        <div>
          {this.state.allCertificates.map(item => {
            return (
              <div className="col-md-4 card-div">
                <div className="blog-card blog-card-blog">
                  <div className="blog-card-image">
                    <a href="#" className="img-a"> <img className="img" src="https://static.vecteezy.com/system/resources/thumbnails/001/782/780/small/light-purple-pink-gradient-blur-backdrop-vector.jpg"></img> </a>
                    <div className="ripple-cont"></div>
                  </div>
                  <div className="blog-table">
                    {/* <h6 className="blog-category blog-text-success"><i className="fas fa-blog"></i>{item.price}</h6> */}
                    <h4 className="blog-card-caption">
                      <Link to={'/lesson/' + item.id} className="title-formation">
                        {item.name}
                      </Link>
                    </h4>
                    <p className="blog-card-description"></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )
    }
  }

  render() {
    if (this.state.submitted == false) {
      return (
        <div class="login-box">
          <h2>Check Certificate</h2>
          <form>
            <div class="user-box">
              <input type="text" value={this.state.address} onChange={this.handleChangeAddress} />
              <label>Address</label>
            </div>
            <div className='centerBtn'>
              <div class="btn" onClick={this.sendAnwser}>
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
    } else {
      return (
        <div class="col-sm-8 cards-div">
          {this.drawMap(this.state.allCertificates)}
        </div>
      )
    }
  }
}