import React, { Component } from "react";
import cookie from "react-cookies";
import { domain } from "../../../utils/config";
import _ from "lodash";
import { withAlert } from "react-alert";
// import CKEditor from "ckeditor4-react";

import CKEditor from "react-ckeditor-component";

class UpdatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      title: "",
      content: "",
      category: [],
      thumbnail: "",
      files: {},
      status: "ACTIVE",
    };
  }

  myChangeHandle = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({
      [nam]: val,
    });
  };

  loadListCategory = async () => {
    const url = domain + "categories/list_create_posts";
    let fetchData = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": cookie.load("userToken"),
      }),
    };

    await fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result.data.category,
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

  loadPostById = async () => {
    try {
      const href = window.location.href;
      const id = href.substring(href.lastIndexOf(".") + 1, href.length);

      const url = domain + `posts/view/${id}`;
      const fetchData = {
      mode: 'cors',
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "x-access-token": cookie.load("userToken"),
        }),
      };
      const response = await fetch(url, fetchData);
      const result = await response.json();
      this.setState({
        isLoaded: true,
        title: result.data.post.title,
        content: result.data.post.content,
        thumbnail: domain + result.data.post.thumbnail,
        category: result.data.post.category.map(({ _id }) => _id),
        status: result.data.post.status,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  };

  changeSelectCategory = (e) => {
    let options = e.target.options;
    let value = [];
    for (let i = 0; i < options.length; ++i) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      category: value,
    });
  };

  onEditorChange = (evt) => {
    this.setState({
      ...this,
      content: evt.editor.getData(),
    });
  };

  onSubmitForm = () => {
    const { files, title, content, status, category } = this.state;
    const { alert } = this.props;
    const href = window.location.href;
    const id = href.substring(href.lastIndexOf(".") + 1, href.length);
    const url = domain + `posts/update/${id}`;
    if (title === "" || content === "" || _.isEmpty(category)) {
      alert.error("Vui lòng không được để trống dữ liệu");
      return;
    }
    let formData = new FormData();
    if (files) {
      formData.append("thumbnail", files[0]);
    }

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("status", status);
    const fetchData = {
      mode: 'cors',
      method: "PUT",
      body: formData,
      headers: new Headers({
        "x-access-token": cookie.load("userToken"),
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status) {
            alert.success("Thay đổi thành công!");
          } else {
            alert.show("Vui lòng thử lại!");
          }
        },
        (error) => {
          alert.error("có lỗi xảy ra");
        }
      );
  };

  componentDidMount() {
    this.loadListCategory();
    this.loadPostById();
  }

  handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    this.setState({
      files,
      thumbnail: URL.createObjectURL(e.target.files[0]),
    });
  };

  onChangeStatus = (e, key) => {
    if (key === "status") {
      this.setState({
        status: e.target.checked ? "ACTIVE" : "INACTIVE",
      });
    }
  };

  render() {
    const {
      error,
      isLoaded,
      categories,
      thumbnail,
      title,
      content,
      category,
      status,
    } = this.state;

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
          <div className="form-example-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-example-wrap">
                    <div className="form-group post-status__update">
                      <div className="nk-int-st">
                        <div className="toggle-select-act fm-cmp-mg">
                          <div className="nk-toggle-switch" data-ts-color="red">
                            <label htmlFor="ts2" className="ts-label">
                              Trạng thái
                            </label>
                            <input
                              id="ts2"
                              type="checkbox"
                              hidden="hidden"
                              onChange={(e) => this.onChangeStatus(e, "status")}
                              checked={status === "ACTIVE"}
                            />
                            <label htmlFor="ts2" className="ts-helper" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-example-int">
                      <div className="form-group">
                        <label>Tiêu đề</label>
                        <div className="nk-int-st">
                          <input
                            value={title}
                            type="text"
                            onChange={this.myChangeHandle}
                            className="form-control input-sm"
                            name="title"
                            placeholder="Nhập tiêu đề"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-example-int mg-t-15">
                      <div className="form-group">
                        <label>Thể loại</label>
                        <div className="nk-int-st">
                          {isLoaded ? (
                            <select
                              value={category}
                              className="js-example-basic-multiple form-control input-sm"
                              onChange={this.changeSelectCategory}
                              name="category[]"
                              multiple="multiple"
                            >
                              {categories.map((x) => (
                                <option key={x._id} value={x._id}>
                                  {x.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-example-int mg-t-15">
                      <div className="form-group">
                        <label>Nội dung</label>
                        <div className="nk-int-st" >
                          <CKEditor
                            activeClass="p10"
                            content={content}
                            events={{
                              change: this.onEditorChange,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-example-int mg-t-15">
                      <div className="form-group">
                        <label>Ảnh đại diện</label>
                        <div className="nk-int-st">
                          <input
                            type="file"
                            onChange={this.handleFileSelected}
                          />
                          <img alt="hinh-anh-bai-viet"
                            className="post-thumbnail__update"
                            src={thumbnail}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-example-int mg-t-15">
                      <button
                        onClick={this.onSubmitForm}
                        className="btn btn-success notika-btn-success"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withAlert()(UpdatePost);
