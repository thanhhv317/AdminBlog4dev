import React, { Component } from "react";
import chunk from "lodash/chunk";

import Post from "./Post";
import cookie from "react-cookies";
import { domain } from "../../../utils/config";
import remove from "lodash/remove";

import Pagination from "../../Pagination";
import { withAlert } from "react-alert";

class ListPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      removeItem: null,
      deleteConfirmation: false,
      limit: 12,
      perpage: 1,
      maxPage: 10,
      minPage: 1,
      isNext: true,
      isPrevious: true,
    };
  }

  confirmModalDelete = async (id) => {
    await this.setState({
      deleteConfirmation: true,
      removeItem: id,
    });
  };

  closeDeleteConfirmation = () => {
    this.setState({
      deleteConfirmation: false,
    });
  };

  onRemoveRow = () => {
    const { alert } = this.props;
    const { removeItem, items } = this.state;
    const url = domain + `posts/delete/${removeItem}`;
    let fetchData = {
      method: "DELETE",
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
          if (result.status === true) {
            alert.success("xóa thành công!");
            remove(items, (item) => item._id === removeItem);
            this.setState({
              deleteConfirmation: false,
              removeItem: null,
            });
          } else {
            alert.error("Lỗi, vui lòng thử lại!");
          }
        },
        (error) => {
          console.log(error);
          alert.error("Lỗi, vui lòng thử lại!");
        }
      );
  };

  loadPosts = (limit, perpage) => {
    const url = domain + `posts/list?limit=${limit}&perpage=${perpage}`;

    const fetchData = {
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
          let maxPage = Math.ceil(+result.data.count / limit);
          this.setState({
            isLoaded: true,
            items: result.data.posts,
            maxPage: maxPage,
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

  toNextPage = () => {
    const { perpage, maxPage, limit } = this.state;
    if (perpage < maxPage) {
      this.setState({
        perpage: perpage + 1,
        isNext: true,
      });
      this.loadPosts(limit, perpage + 1);
    } else {
      this.setState({
        isNext: false,
      });
    }
  };

  toPreviousPage = () => {
    const { perpage, limit } = this.state;
    if (perpage > 1) {
      this.setState({
        perpage: perpage - 1,
        isPrevious: true,
      });
      this.loadPosts(limit, perpage - 1);
    } else {
      this.setState({
        isPrevious: false,
      });
    }
  };

  componentDidMount() {
    const { limit, perpage } = this.state;
    this.loadPosts(limit, perpage);
  }

  render() {
    const {
      error,
      isLoaded,
      items,
      deleteConfirmation,
      perpage,
      maxPage,
    } = this.state;
    const posts = chunk(items, 3);
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
      return (
        <div className="animation-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="loading">Đang tải...</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="animation-area">
            <div className="container">
              {posts.map((items, index) => (
                <div className="row" key={index}>
                  {items.map((x, i) => {
                    return (
                      <Post
                        confirmModalDelete={() =>
                          this.confirmModalDelete(x._id)
                        }
                        deleteConfirmation={deleteConfirmation}
                        removeItem={this.onRemoveRow}
                        closeDeleteConfirmation={this.closeDeleteConfirmation}
                        key={i}
                        postIndexInRow={index}
                        post={x}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {maxPage > 1 ? (
            <Pagination
              onNext={() => this.toNextPage()}
              onPrevious={() => this.toPreviousPage()}
              perpage={perpage}
              maxPage={maxPage}
            />
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

export default withAlert()(ListPost);
