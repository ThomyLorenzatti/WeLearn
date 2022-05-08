import React from 'react';
import './Form.css';
import axios from 'axios';

export default class Template extends React.Component {
  constructor() {
    super();
    this.state = { 
      name: "",
      number: 0,
      content: ""
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

  render() {
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
          <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
            Submit
          </a>
        </form>
      </div>
    );
  }
}