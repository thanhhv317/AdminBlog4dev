import React, { Component } from "react";
import { domain } from "../../../../utils/config";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import { withAlert } from "react-alert";
import remove from "lodash/remove";
import DeleteItem from "../../../Modal/DeleteItem";
import Header from "../../../Header";
import cookie from "react-cookies";

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      post,
      postIndexInRow,
      deleteConfirmation,
      confirmModalDelete,
      removeItem,
      closeDeleteConfirmation,
    } = this.props;
    return (
      <div className={`col-lg-4 col-md-4 col-sm-4 col-xs-12 ${postIndexInRow > 0 ? "mg-t-30" : ""}`}>
        <div className="animation-single-int">
          <div className="animation-ctn-hd">
            <Link
              className="post-title"
              to={"posts/view/" + post.slug + "." + post._id}
            >
              {post.title}
            </Link>
            <div>
              {Parser(
                post.content.substring(
                  0,
                  post.content.length < 100 ? post.content.length : 100
                )
              )}
            </div>
          </div>
          <div className="animation-img mg-b-15 post-thumbnail__list">
            <div>
              <label
                className={`post-status__list ${
                  post.status === "ACTIVE" ? "active" : "inactive"
                }`}
              >
                {post.status}
              </label>
            </div>
            <img
              className="animate-one post-thumbnail"
              src={domain + post.thumbnail}
              alt=""
            />
          </div>
          <div className="animation-action">
            <div className="row">
              <div className="col-lg-6">
                <div className="animation-btn">
                  <Link
                    to={"posts/edit/" + post.slug + "." + post._id}
                    className="btn ant-nk-st bounce-ac"
                  >
                    <i className="notika-icon notika-draft"></i> &nbsp;Sửa
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="animation-btn sm-res-mg-t-10 tb-res-mg-t-10 dk-res-mg-t-10">
                  <button
                    className="btn ant-nk-st flash-ac"
                    onClick={confirmModalDelete}
                  >
                    <i className="notika-icon notika-trash"></i> &nbsp;Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DeleteItem
          open={deleteConfirmation}
          onSubmit={removeItem}
          onClose={closeDeleteConfirmation}
        />
      </div>
    );
  }
}

export default withAlert()(Post);
