import React, { Component } from "react";
import { domain } from "../../../utils/config";
import { withAlert } from "react-alert";
import { Link } from "react-router-dom";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullname: "",
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

  onSubmit = () => {
    const { alert } = this.props;
    const { username, fullname, password } = this.state;
    if (username === "" || fullname === "" || password === "") {
      alert.error("Không hợp lệ");
      return;
    }
    const url = domain + "auth/register";
    const data = {
      username,
      fullname,
      password,
    };
    const fetchData = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status) {
            alert.success("Thành công, vui lòng chờ xét duyệt");
          } else {
            alert.error(result.data.message);
          }
        },
        (error) => {
          alert.error("Đã xảy ra lỗi");
        }
      );
  };

  render() {
    const { username, fullname, password } = this.state;
    return (
      <div className="nk-block" id="l-register">
        <div className="nk-form">
          <div className="input-group">
            <span className="input-group-addon nk-ic-st-pro">
              <i className="notika-icon notika-support" />
            </span>
            <div className="nk-int-st">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => this.onChange(e)}
              />
            </div>
          </div>
          <div className="input-group mg-t-15">
            <span className="input-group-addon nk-ic-st-pro">
              <i className="notika-icon notika-social" />
            </span>
            <div className="nk-int-st">
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                name="fullname"
                value={fullname}
                onChange={(e) => this.onChange(e)}
              />
            </div>
          </div>
          <div className="input-group mg-t-15">
            <span className="input-group-addon nk-ic-st-pro">
              <i className="notika-icon notika-edit" />
            </span>
            <div className="nk-int-st">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => this.onChange(e)}
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-info notika-btn-info waves-effect"
            onClick={this.onSubmit}
          >
            REGISTER
          </button>
          <Link
            to="#l-login"
            data-ma-action="nk-login-switch"
            data-ma-block="#l-login"
            className="btn btn-login btn-success btn-float"
          >
            <i className="notika-icon notika-right-arrow" />
          </Link>
        </div>
        <div className="nk-navigation rg-ic-stl">
          <Link to="#" data-ma-action="nk-login-switch" data-ma-block="#l-login">
            <i className="notika-icon notika-right-arrow" />{" "}
            <span>Sign in</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default withAlert()(Register);
