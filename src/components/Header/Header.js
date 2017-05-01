/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';



import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';



class Header extends React.Component {
  
  
  render() {
  
    return (
      <div className={s.root}>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Modest Lifer" />
            <FontIcon className="muidocs-icon-custom-sort" />
          </ToolbarGroup>
          <Navigation />
        </Toolbar>
        <div className={s.banner}>
            <h1 className={s.bannerTitle}>Modest Lifer</h1>
            <p className={s.bannerDesc}>Some Modest Lifer Slogan</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
