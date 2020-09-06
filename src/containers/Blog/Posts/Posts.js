import React, { Component } from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }
    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return{
                        ...post,
                        author: 'Dev'
                    }
                });
                this.setState({posts: updatedPosts})
                // console.log(response);
            })
            .catch(err => {
                console.log(err);
                // this.setState({error: true});
            });
    }
    
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    
    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error) {
            posts = <p style={{textAlign: 'center'}}>Loading {Object.keys(this.state)[0]}...</p>;
            if(this.state.posts.length > 0) {
                posts = this.state.posts.map(
                    post => {
                        return (
                            <Link 
                            to={'/' + post.id}
                            key={post.id}>
                                <Post 
                                    title={post.title} 
                                    author={post.author}
                                    clicked={() => this.postSelectedHandler(post.id)} />
                            </Link>
                        );
                    }
                );
            }
        }
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;