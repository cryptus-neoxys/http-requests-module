import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
    state= {
        auth: false
    }

    render () {
        return (
            <div>
                <header className='Nav'>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts/"
                                exact>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path='/new-post' component={NewPost} /> : null}
                    <Route path='/posts' component={Posts} />
                    <Route render={() => <h1>Page Not Found</h1>} />
                    {/* <Redirect from='/' to='/posts' /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;