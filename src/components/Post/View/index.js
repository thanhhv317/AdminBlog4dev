import React, { Component } from "react";
import { domain } from "../../../utils/config";
import cookie from "react-cookies";
import Breadcumb from "../../Breadcomb";
import moment from 'moment';

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      title: "",
      author: "",
      createdAt: "",
    };
  }

  loadPost = () => {
    const href = window.location.href;
    const id = href.substring(href.lastIndexOf(".") + 1, href.length);

    const url = domain + `posts/view/${id}`;
    const fetchData = {
      mode: 'no-cors',
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": cookie.load("userToken"),
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result.data.post,
            title: result.data.post.title,
            author: result.data.post.authorId.fullname,
            createdAt: result.data.post.createAt
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  componentDidMount() {
    this.loadPost();
  }
  render() {
    const { error, isLoaded, items, title ,author,createdAt} = this.state;
    if (error) {
      return (
        <div className="animation-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>{error.message}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Breadcumb
            title={title}
            content={`Tác giả: ${author} - ${moment(createdAt).format("HH : mm DD-MM-YYYY")}`}
          />
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="typography-list typography-mgn">
                  <div className="typography-bd">
                    <p>
                      <img alt="hinh-anh-bai-viet" src={domain + items.thumbnail} />
                    </p>
                    <h2 className="text-center">{items.title}</h2>
                  </div>
                </div>
                <div className="typography-heading mg-t-30">
                  
                  <div dangerouslySetInnerHTML={{__html: (items.content)}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ViewPost;
