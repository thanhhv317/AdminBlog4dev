import React, { Component } from "react";
import { domain } from "../../../utils/config";

import cookie from "react-cookies";
import { withAlert } from "react-alert";

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      birthday: "",
      username: "",
      password: "",
    };
  }

  onChange = (e) => {
    const nam = e.target.name;
    const val = e.target.value;
    this.setState({
      [nam]: val,
    });
  };

  submitForm = () => {
    const { fullname, birthday, username, password } = this.state;
    const { alert } = this.props;
    if (
      fullname === "" ||
      birthday === "" ||
      username === "" ||
      password === ""
    ) {
      alert.error("Không được để trống dữ liệu");
      return;
    }
    if (password.length < 6) {
      alert.error("Mật khẩu phải lớn hơn 6 ký tự");
      return;
    }
    const url = domain + `users/create`;
    const data = {
      fullname,
      birthday,
      username,
      password,
    };
    const fetchData = {
      mode: 'no-cors',
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
            alert.success(`Thêm mới thành công tài khoản: ${username}`);
            this.setState({
              fullname: "",
              username: "",
              password: "",
              birthday: "",
            });
          } else {
            alert.error(`Đã xảy ra lỗi: ${result.data.message}`);
          }
        },
        (err) => {
          alert.error("Đã xảy ra lỗi, vui lòng thử lại");
        }
      );
  };

  render() {
    const { fullname, birthday, username, password } = this.state;
    return (
      <div>
        <div className="form-example-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="form-example-wrap">
                  <div className="form-example-int">
                    <div className="form-group">
                      <label>Họ và tên</label>
                      <div className="nk-int-st">
                        <input
                          type="text"
                          name="fullname"
                          value={fullname}
                          onChange={(e) => this.onChange(e)}
                          className="form-control input-sm"
                          placeholder="Nhập tên"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-example-int mg-t-15">
                    <div className="form-group">
                      <label>Ngày sinh</label>
                      <div className="nk-int-st">
                        <input
                          type="date"
                          className="form-control auto-size"
                          rows={2}
                          value={birthday}
                          onChange={(e) => this.onChange(e)}
                          name="birthday"
                          placeholder="Ngày sinh"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-example-int">
                    <div className="form-group">
                      <label>Tên đăng nhập</label>
                      <div className="nk-int-st">
                        <input
                          type="text"
                          name="username"
                          value={username}
                          onChange={(e) => this.onChange(e)}
                          className="form-control input-sm"
                          placeholder="Nhập tên đăng nhập"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-example-int mg-t-15">
                    <div className="form-group">
                      <label>Mật khẩu</label>
                      <div className="nk-int-st">
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => this.onChange(e)}
                          className="form-control input-sm"
                          placeholder="Nhập tên mật khẩu"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-example-int mg-t-15">
                  <button
                    className="btn btn-success notika-btn-success"
                    onClick={this.submitForm}
                  >
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(UserCreate);
