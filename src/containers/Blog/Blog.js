import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';


import './Blog.css';
import Posts from './Posts/Posts';
// import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';

const ReactLazyPost = React.lazy(() => import('./NewPost/NewPost'))

class Blog extends Component {
    state = {
        auth: true
    }

    render() {
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
                    {this.state.auth ?
                        <Route
                            path='/new-post'
                            render={(() => (
                                <Suspense fallback={<div>Loading . . .</div>}>
                                    <ReactLazyPost />
                                </Suspense>))
                            } />
                        : null}
                    <Route path='/posts' component={Posts} />
                    <Route render={() => <h1>Page Not Found</h1>} />
                    {/* <Redirect from='/' to='/posts' /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;