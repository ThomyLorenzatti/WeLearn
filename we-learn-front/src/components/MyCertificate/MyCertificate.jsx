import React from 'react';
import './MyCertificate.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading.jsx';

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
        keys: [],
        loading: true
    };
  }

  async componentDidMount() {
    var wallet = await connect()
    await axios.get(API + '/get_my_certificate/' + wallet).then(res => {
       console.log(res);
       this.setState({ keys: res.data.data.keys })
       this.setState({ certificates: res.data.data.certificates })
       this.setState({ loading: false })
    })
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
          {this.state.keys.map(item => {
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
    if (this.state.loading) {
      return(
        <Loading/>
      )
    }
    return (
    <div class="col-sm-8 cards-div">
        <span className='categorie'>Keys</span>
        {this.drawMap(this.state.keys)}
        <span className='categorie'>Certificates</span>
        {this.drawMap(this.state.certificates)}
    </div>
    );
  }
}