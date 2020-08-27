import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import ListPost from '../components/Post/List';
import CreateCategory from '../components/Data/Create/Category';

import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

import Header from '../components/Header'
import MobileMenuNav from '../components/Nav/MobileMenuNav'
import MainMenuNav from '../components/Nav/MainMenuNav'
import Breadcumb from '../components/Breadcomb'
import Footer from '../components/Footer'

import DataList from '../components/Data/List'

class PageRouter extends Component {

    render() {
        return (
            <div className="main">
                <Route exact path="/login">
                    <div className="login-content">
                    <Login/>
                    <Register/>
                    </div>
                </Route>
                <Route path="/dashboard">
                    <Header/>
                    <MobileMenuNav/>
                    <MainMenuNav/>
                    <Breadcumb/>
                    <Footer/>
                </Route>
                <Route path="/posts">
                    <Header/>
                    <MobileMenuNav/>
                    <MainMenuNav/>
                    <Breadcumb/>
                    <ListPost />
                    <Footer/>
                </Route>
                {/* CATEGORY */}
                <Route exact path="/category">
                    <Header/>
                    <MobileMenuNav/>
                    <MainMenuNav/>
                    <Breadcumb title={"Thể loại"} content="Danh sách"/>
                    <DataList 
                        title="Danh sách dữ liệu"
                        description="It's just that simple. Turn your simple table into a sophisticated data table and offer your users a nice experience and great features without any effor"
                        linkAPI="categories/list"
                        column={['Tên', 'Mô tả', 'Trạng thái', 'Chức năng']}
                    />
                    <Footer/>
                </Route>
                <Route exact path="/category/create">
                    <Header/>
                    <MobileMenuNav/>
                    <MainMenuNav/>
                    <Breadcumb title={"Thể loại"} content="Thêm mới thể loại"/>
                    <CreateCategory />
                    <Footer/>
                </Route>
            </div>
        );
    }
}

export default PageRouter;