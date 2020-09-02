import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import cookie from 'react-cookies'

import ListPost from '../components/Post/List';
import CreatePost from '../components/Post/Create';

import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

import Header from '../components/Header'
import MobileMenuNav from '../components/Nav/MobileMenuNav'
import MainMenuNav from '../components/Nav/MainMenuNav'
import Breadcumb from '../components/Breadcomb'
import Footer from '../components/Footer'

import CreateCategory from '../components/Data/Create/Category';
import DataList from '../components/Data/List'

class PageRouter extends Component {

    constructor(props) {
        super(props);
        
    }
    state = {
        loggedIn: false,
        loading: true,
    }

    onLoggedIn = () => {
        this.setState({ loggedIn: true })
    }

    onLoggedOut = () => {
        cookie.remove('userToken')
        this.setState({ loggedIn: false })
    }

    componentDidMount() {
        const token = cookie.load("userToken");
        if (token) {
            this.setState({
                loggedIn: true,
                loading: false
            })
        } else {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        const { loading, loggedIn } = this.state;
        if (loading) return <em>Loading...</em>;
        return (
            <div className="main">
                {
                    loggedIn ? <><Header onLoggedOut={this.onLoggedOut} />
                        <MobileMenuNav />
                        <MainMenuNav /></> : <Redirect
                            to={{
                                pathname: "/login"
                            }} />
                }
                <Route exact path="/login">
                    {
                        loggedIn && <Redirect to={{ pathname: "/" }} />
                    }
                    <div className="login-content">
                        <Login onLoggedIn={this.onLoggedIn} />
                        <Register />
                    </div>
                </Route>
                <Route exact path="/">
                    <Breadcumb />
                    <div>Dashboard</div>
                </Route>
                {/* POSTS  */}
                <Route exact path="/posts">
                    <Breadcumb />
                    <ListPost />
                </Route>
                <Route exact path="/posts/create">
                    <Breadcumb />
                    <CreatePost />
                </Route>

                {/* CATEGORY */}
                <Route exact path="/category">
                    <Breadcumb title={"Thể loại"} content="Danh sách" />
                    <DataList
                        title="Danh sách dữ liệu"
                        description=""
                        linkAPI="categories"
                        column={['Tên', 'Mô tả', 'Trạng thái', 'Chức năng']}
                    />
                    
                </Route>
                <Route exact path="/category/create">
                    <Breadcumb title={"Thể loại"} content="Thêm mới thể loại" />
                    <CreateCategory />
                </Route>
                {
                    loggedIn &&
                    <Footer />
                }
            </div>
        );
    }
}

export default PageRouter;