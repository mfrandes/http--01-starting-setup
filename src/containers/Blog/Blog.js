import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedData = posts.map(post => {
                    return {
                        ...post,
                        author: 'Edd'
                    }
                })
                this.setState({ posts: updatedData })
                //  console.log(response); 
            });
    }

    render() {
        const posts = this.state.posts.map(posts => {
            return <Post 
            title={posts.title}
            key={posts.is}
            author={posts.author}
            />
        })
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;