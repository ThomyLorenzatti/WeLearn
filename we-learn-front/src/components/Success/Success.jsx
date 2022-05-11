import React from 'react';
import './Success.css';
import { Link } from 'react-router-dom';

export default class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title
    };
    console.log(this.props)
  }

  render() {
    return (
      <div class="login-box">
        <h2>{this.state.title}</h2>
        <form>
          <div className='centerBtn'>
            <Link to='/' className='btn'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
                Return to Home
            </Link>
          </div>
        </form>
        </div>
    );
  }
}