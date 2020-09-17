import React, { Component } from "react";
import { domain } from "../../../utils/config";
import cookie from "react-cookies";
import { withAlert } from "react-alert";

class CrawlWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      title: "",
      content: "",
      thumbnail: "",
    };
  }

  myChangeHandle = (e) => {
    const nam = e.target.name;
    const val = e.target.value;
    this.setState({
      [nam]: val,
    });
  };

  onSubmit = () => {
    const { alert } = this.props;
    const { thumbnail, title, content, link } = this.state;
    if (thumbnail === "" || title === "" || content === "" || link === "" || !(/^https:\/\//.test(link))) {
      alert.error("Các trường dữ liệu không phù hợp!");
      return;
    }
    const url = domain + "statistics/crawl_website";
    const data = {
      thumbnail,
      title,
      content,
      link,
    };
    const fetchData = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": cookie.load("userToken"),
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status) {
            alert.success("Thêm mới thành công!");
            this.setState({
              link: "",
            });
          } else {
            alert.error("Đã xảy ra lỗi vui lòng thử lại");
          }
        },
        (error) => {
          alert.error("Đã xảy ra lỗi vui lòng thử lại");
        }
      );
  };

  render() {
    return (
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div className="form-example-wrap">
          <div className="form-example-int">
            <div className="form-group">
              <label>Đường dẫn bài viết</label>
              <div className="nk-int-st">
                <input
                  type="text"
                  className="form-control input-sm crawl_selector"
                  name="link"
                  placeholder="đường dẫn của website"
                  onChange={this.myChangeHandle}
                />
              </div>
            </div>
          </div>
          <div className="form-example-int mg-t-15">
            <div className="form-group">
              <label>Tiêu đề: (Selector)</label>
              <div className="nk-int-st">
                <textarea
                  className="form-control crawl_selector"
                  rows={5}
                  name="title"
                  placeholder="#div>div.title_post"
                  onChange={this.myChangeHandle}
                />
              </div>
            </div>
          </div>
          <div className="form-example-int mg-t-15">
            <div className="form-group">
              <label>Nội dung: (Selector)</label>
              <div className="nk-int-st">
                <textarea
                  className="form-control crawl_selector"
                  rows={5}
                  name="content"
                  placeholder="#div>div.content_post"
                  onChange={this.myChangeHandle}
                />
              </div>
            </div>
          </div>
          <div className="form-example-int mg-t-15">
            <div className="form-group">
              <label>Hình ảnh: (Link)</label>
              <div className="nk-int-st">
                <textarea
                  className="form-control crawl_selector"
                  rows={5}
                  name="thumbnail"
                  placeholder="https://placeholder.com/400x400"
                  onChange={this.myChangeHandle}
                />
              </div>
            </div>
          </div>
          <div className="form-example-int mg-t-15">
            <button
              className="btn btn-success notika-btn-success"
              onClick={this.onSubmit}
            >
              Thêm mới
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(CrawlWebsite);
