import React from 'react';
import './Footer.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_REACT_URL

export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  async componentDidMount() {
  }

  render() {
    return (
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 center-div">
              <h3>Links</h3>
              <ul class="list-unstyled three-column">
                {/* <a href="/"><li>Home</li></a>
                <a href="/publish-formation"><li>Create Formation</li></a>
                <a href="/formations"><li>Formations</li></a>
                <a href="/check-certificates"><li>Check certificates</li></a> */}
                <a href="/contact">Contact Us</a>
              </ul>
            </div>
            <div class="col-lg-4 center-div">
              <h3>Our Networks</h3>
              <a href="https://discord.gg/2bp8r6YDac">
                <img class="img-thumbnail" src="https://seeklogo.com/images/D/discord-logo-134E148657-seeklogo.com.png" alt=""/>
              </a>
              <a href="https://twitter.com/welearn_me">
              <img class="img-thumbnail" src="https://cdn.discordapp.com/attachments/972406713561001984/974445883242446939/Twitter_Bird.svg.png" alt=""/>
              </a>
            </div>
            
          </div>
        </div>
        <div class="copyright center-div">
          Copyright &copy; 2022 <span>WeLearn</span>
        </div>
      </footer>
    );
  }
}