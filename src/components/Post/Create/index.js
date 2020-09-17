import React, { Component } from "react";
import cookie from "react-cookies";
import { domain } from "../../../utils/config";
import { withAlert } from "react-alert";
import _ from "lodash";

import CKEditor from "ckeditor4-react";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      categories: [],
      title: "",
      content: "",
      category: [],
      files: {},
      creating: true,
    };
  }

  loadCategory = () => {
    const url = domain + "categories/list_create_posts";
    let fetchData = {
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

  componentDidMount() {
    this.loadCategory();
  }

  myChangeHandle = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({
      [nam]: val,
    });
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

  handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    this.setState({
      files,
    });
  };

  onSubmitForm = () => {
    const { alert } = this.props;
    const { files, title, content, category, creating } = this.state;
    if (!creating) return;
    if (
      title === "" ||
      content === "" ||
      _.isEmpty(category) ||
      _.isEmpty(files)
    ) {
      alert.error("Vui lòng không được để trống dữ liệu");
      console.log(this.state);
      return;
    }
    const url = domain + "posts/create";
    console.log(this.state)

    let formData = new FormData();
    formData.append("thumbnail", files[0]);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    let fetchData = {
      method: "POST",
      body: formData,
      headers: new Headers({
        // "Content-Type": "application/json",
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
              creating: true,
              title: "",
              content: "",
              files: {},
              category: [],
            });
          } else {
            alert.show("Vui lòng thử lại!");
          }
        },
        (error) => {
          alert.error("có lỗi xảy ra");
        }
      );
  };

  onEditorChange= (evt) => {
    this.setState({
      content: evt.editor.getData(),
    });
  }

  render() {
    const {
      isLoaded,
      categories,
      title,
      content,
      category,
    } = this.state;
    return (
      <div>
        <div className="form-example-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-example-wrap">
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
                            className="js-example-basic-multiple form-control input-sm"
                            onChange={this.changeSelectCategory}
                            name="category[]"
                            value={category}
                            multiple="multiple"
                          >
                            {categories.map((x) => {
                              return (
                                <option key={x._id} value={x._id}>
                                  {x.name}
                                </option>
                              );
                            })}
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
                      <div className="nk-int-st">
                        <CKEditor
                          className="form-control"
                          data={content}
                          onChange={this.onEditorChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-example-int mg-t-15">
                    <div className="form-group">
                      <label>Ảnh đại diện</label>
                      <div className="nk-int-st">
                        <input type="file" onChange={this.handleFileSelected} />
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

export default withAlert()(CreatePost);
