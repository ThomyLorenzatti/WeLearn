import React from 'react';
import './ContactUs.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_REACT_URL

export default class ContactUs extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
      return (
        <form>      
          <input name="name" type="text" class="feedback-input" placeholder="Name" />   
          <input name="email" type="text" class="feedback-input" placeholder="Email" />
          <textarea name="text" class="feedback-input" placeholder="Comment"></textarea>
          <input type="submit1" value="Envoyer"/>
        </form>
      );
    }
}