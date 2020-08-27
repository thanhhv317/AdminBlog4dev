import React, { Component } from 'react';
import Post from './Post'

class ListPost extends Component {
    render() {
        return (
            <div className="animation-area">
                <div className="container">
                    <div className="row">
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                    </div>
                </div>
            </div>

        );
    }
}

export default ListPost;