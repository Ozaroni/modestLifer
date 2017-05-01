/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
var firebase = require('firebase');

import UserStore from "../../data/stores/UserStore"
import history from '../../history';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(){
    super()
    this.state={
      userName: null,
      password: null
    }
  }
  componentWillMount = () => {
    UserStore.on('userChanged', this._updateUser);
  }
  _updateUser = () => {
    if(UserStore.getUser()!= null){
      console.log("redirecting to admin page")
      history.push({pathname: '/admin'})
    }
  }
  createAccount = () => {
    console.log("CREATING USER")
    var database = firebase.database();
    firebase.auth().createUserWithEmailAndPassword("shannon@cox.net", "admin1234").catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
      // ...
    });
  }
  loginUser = () => {
    console.log("Logging in")
    const {userName, password } = this.state
    let that = this
    firebase.auth().signInWithEmailAndPassword(userName, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      that.setState({error: errorMessage})
      // ...
    });
  }
  handleUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };
  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  render() {
    const {error} = this.state
    return (
      <div className={s.root}>
        <div className={s.container}>
        <Card>
          <CardHeader title="Login" />
          {error ? <CardText > {error} </CardText > : null }
          <CardText >
            <TextField onChange={this.handleUserName.bind(this)} hintText="Username" />
            <TextField onChange={this.handlePassword.bind(this)} hintText="Password" />
          </CardText>
          <CardActions>
            <RaisedButton onClick={this.loginUser} primary={true} label="Login" />
          </CardActions>
        </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Login);
