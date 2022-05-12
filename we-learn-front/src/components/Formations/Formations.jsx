import React from 'react';
import './Formations.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_REACT_URL

export default class Formations extends React.Component {
  constructor() {
    super();
    this.state = {
        all: []
    };
  }

  async componentDidMount() {
    await axios.get(API + '/formations').then(res => {
       console.log(res);
       this.setState({ all: res.data.data })
    })
}
  render() {
    return (
    <div class="col-sm-8 cards-div">
        {this.state.all.map(item => {
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
                        {item.name}
                    </Link>
                    </h4>
                    <p class="blog-card-description"></p>
                    <div class="ftr">
                        <span class="rate"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></span>
                        <div class="author">
                            <span class="card-price">{item.price}</span>
                            <img src="https://cdn.discordapp.com/attachments/972406713561001984/974278984017801256/LRNlogo.png" alt="..." class="avatar img-raised"></img>
                        </div>
                    </div>
                    </div>
                </div>
            </div>);
        })}
    </div>
    );
  }
}