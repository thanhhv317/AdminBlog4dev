import React, { Component } from 'react';
import Post from './Post';
import cookies from 'react-cookies';
import {domain} from '../../../utils/config';

class ListPost extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        const url = domain + 'posts/lists'
    }
    
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