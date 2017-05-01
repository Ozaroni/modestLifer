/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import UserStore from "../../data/stores/UserStore"

class Navigation extends React.Component {
  constructor(){
    super()
    this.state = {
      user: UserStore.getUser()
    }
  }
  componentWillMount = () => {
    UserStore.on('userChanged', this._updateUser);
  }
  _logOut = () => {
    UserStore.logOut()
  }
  _updateUser = () => {
    console.log(UserStore.getUser())
    this.setState({
      user : UserStore.getUser()
    })
  }
  render() {
    const {user} = this.state
    return (
      <ToolbarGroup>
        <FlatButton secondary={true} label="Home" href="/" primary={true} />
        <FlatButton secondary={true} label="About" href="/about" primary={true} />
        <FlatButton secondary={true} label="Contact" href="/contact" primary={true} />
        <FlatButton secondary={true} label="Sign up" href="/register" primary={true} />
        { user ? 
          <span>
            <RaisedButton primary={true} label={user.email + " - Logout"} onClick={this._logOut} />
          </span>
          :
          <FlatButton secondary={true} label="Log in" href="/login" primary={true} />
        }
      </ToolbarGroup>
    );
  }
}

export default withStyles(s)(Navigation);
