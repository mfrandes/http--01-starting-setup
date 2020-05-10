import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedData = posts.map(post => {
                    return {
                        ...post,
                        author: 'Edd'
                    }
                })
                this.setState({ posts: updatedData })
                console.log(response);
            })
            .catch(error => {
                // console.log(error); 
                this.setState({ error: true })
            });
    }

    postSelectedHandler = id => {
        console.log('Bazinga', id);

        this.setState({ selectedPostId: id })
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Somesing went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map(posts => {
                return <Post
                    title={posts.title}
                    key={posts.id}
                    author={posts.author}
                    clicked={() => this.postSelectedHandler(posts.id)}
                />
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;