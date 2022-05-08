import React from 'react';
import './Formations.css';
import axios from 'axios';

const API = 'http://localhost:8080'

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
       this.setState({ all: res.data })
    })
    console.log(this.state.all);
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
                        <a href="#">{item.name}</a>
                    </h4>
                    <p class="blog-card-description"></p>
                    <div class="ftr">
                        <div class="author">
                            <img src="https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg" alt="..." class="avatar img-raised"></img>
                            <span>Lorem</span>
                            <span class="card-price">{item.price} LRN</span>
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