/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Post from './Post';
import Layout from '../../components/Layout';

const title = 'Blog Post'; 

export default {
  path: '/post',
  children: [
    {
      path: '/:postName',                   // www.example.com/admin/users
      action: (context) => {
        return {
          title,
          component: <Layout><Post slug={context.params.postName}  /></Layout>,
        }
      },
      /*path: '*',                   // www.example.com/admin/users
      action: (context) => {
        return {
          title,
          component: <Layout><Post title={context.params.postName} /></Layout>,
        }
      },*/
    },
  ]
/*  async action({ fetch }) {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: '{news{title,link,content}}',
      }),
    });
    const { data } = await resp.json();
    if (!data || !data.news) throw new Error('Failed to load the news feed.');
    return {
      title: 'React Starter Kit',
      component: <Layout><Home news={data.news} /></Layout>,
    };
  },*/

};
