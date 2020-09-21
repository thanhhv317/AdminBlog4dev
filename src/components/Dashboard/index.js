import React, { Component } from "react";
import BlockInfo from "./BlockInfo";
import { domain } from "../../utils/config";
import cookie from "react-cookies";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: 0,
      cateogires: 0,
      posts: 0,
      comments: 0,
    };
  }

  componentDidMount() {
    const url = domain + "statistics/dashboard_infomation";
    const fetchData = {
      method: "GET",
      mode: 'no-cors',
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": cookie.load("userToken"),
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            users: result.data.users,
            categories: result.data.categories,
            posts: result.data.posts,
            comments: result.data.comments,
          });
        },
        (err) => {}
      );
  }

  render() {
    const { users, categories, posts, comments } = this.state;
    return (
      <div className="container">
        <div className="row">
          <BlockInfo data={posts} text="Bài viết" icon="notika-star" color="success"/>
          <BlockInfo data={categories} text="Thể loại" icon="notika-promos" color="danger"/>
          <BlockInfo data={users} text="Người dùng" icon="notika-support" color="warning"/>
          <BlockInfo
            data={comments}
            text="Bình luận chưa xét duyệt"
            icon="notika-form"
            color="info"
          />
        </div>
        <div style={{ height:200 }}/>
      </div>
    );
  }
}

export default Dashboard;
