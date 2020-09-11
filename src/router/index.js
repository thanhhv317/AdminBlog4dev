import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import cookie from "react-cookies";

import ListPost from "../components/Post/List";
import CreatePost from "../components/Post/Create";
import ViewPost from "../components/Post/View";
import UpdatePost from "../components/Post/Update";

import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

import Header from "../components/Header";
import MobileMenuNav from "../components/Nav/MobileMenuNav";
import MainMenuNav from "../components/Nav/MainMenuNav";
import Breadcumb from "../components/Breadcomb";
import Footer from "../components/Footer";

import CreateCategory from "../components/Data/Create/Category";
import DataList from "../components/Data/List";

import Comment from "../components/Comment";

import UserList from "../components/User";
import UserCreate from "../components/User/Create";

import Dashboard from "../components/Dashboard";

import Statistic from "../components/Statistic";

class PageRouter extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loggedIn: false,
    loading: true,
  };

  onLoggedIn = () => {
    this.setState({ loggedIn: true });
  };

  onLoggedOut = () => {
    cookie.remove("userToken");
    this.setState({ loggedIn: false });
  };

  componentDidMount() {
    const token = cookie.load("userToken");
    if (token) {
      this.setState({
        loggedIn: true,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, loggedIn } = this.state;
    if (loading) return <em>Loading...</em>;
    return (
      <div className="main">
        {loggedIn ? (
          <>
            <Header onLoggedOut={this.onLoggedOut} />
            <MobileMenuNav />
            <MainMenuNav />
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )}
        <Route exact path="/login">
          {loggedIn && <Redirect to={{ pathname: "/" }} />}
          <div className="login-content">
            <Login onLoggedIn={this.onLoggedIn} />
            <Register />
          </div>
        </Route>
        <Route exact path="/">
          <Breadcumb title="Xin chào" />
          <Dashboard />
        </Route>

        {/* POSTS  */}
        <Route exact path="/posts">
          <Breadcumb title="Danh sách bài viết" />
          <ListPost />
        </Route>

        <Route exact path="/posts/view/:slug">
          <ViewPost />
        </Route>
        <Route exact path="/posts/edit/:slug">
          <Breadcumb title="Chỉnh sửa bài viết" />
          <UpdatePost />
        </Route>
        <Route exact path="/posts/create">
          <Breadcumb title="Thêm mới bài viết" />
          <CreatePost />
        </Route>

        {/* CATEGORY */}
        <Route exact path="/category">
          <Breadcumb title="Danh sách thể loại" />
          <DataList
            title="Danh sách dữ liệu"
            description=""
            linkAPI="categories"
            column={["Tên", "Mô tả", "Trạng thái", "Chức năng"]}
          />
        </Route>
        <Route exact path="/category/create">
          <Breadcumb title="Thêm mới thể loại" />
          <CreateCategory />
        </Route>

        {/* COMMENTS */}
        <Route exact path="/comments">
          <Breadcumb title="Danh sách bình luận" />
          <Comment />
        </Route>

        {/* USERS  */}
        <Route exact path="/users">
          <Breadcumb title="Danh sách thành viên" />
          <UserList />
        </Route>
        <Route exact path="/users/create">
          <Breadcumb title="Thêm mới thành viên" />
          <UserCreate />
        </Route>

        {/* STATISTICS */}
        <Route exact path="/statistics">
          <Breadcumb title="Số liệu thống kê" />
          <Statistic />
        </Route>

        {loggedIn && <Footer />}
      </div>
    );
  }
}

export default PageRouter;
