import React, { Component } from "react";
import cookie from "react-cookies";
import { withAlert } from "react-alert";
import { domain } from "../../../utils/config";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  myChangeHandle = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  submitForm = () => {
    const { username, password } = this.state;
    const { alert } = this.props;

    if (username !== "" || password !== "") {
      const url = domain + "auth/login";
      let data = {
        username,
        password,
      };

      let featchData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };

      fetch(url, featchData)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.status === true) {
              cookie.save("userToken", result.data["token"], {
                path: "/",
              });
              cookie.save("userLevel", result.data["level"], {
                path: "/",
              });
              cookie.save("username", result.data["username"], {
                path: "/",
              });
              cookie.save("userCreateAt", result.data["createAt"], {
                path: "/",
              });
              cookie.save("userFullname", result.data["fullname"], {
                path: "/",
              });
              this.props.onLoggedIn();
            } else {
              alert.error(result.data.message);
            }
          },
          (error) => {
            alert.error("Đã xảy ra lỗi");
          }
        );
    } else {
      alert.error("Không hợp lệ");
    }
  };

  render() {
    return (
      <div className="nk-block toggled" id="l-login">
        <div className="nk-form">
          <div className="input-group">
            <span className="input-group-addon nk-ic-st-pro">
              <i className="notika-icon notika-support" />
            </span>
            <div className="nk-int-st">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                onChange={this.myChangeHandle}
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
                name="password"
                placeholder="Password"
                onChange={this.myChangeHandle}
              />
            </div>
          </div>
          <div className="fm-checkbox"></div>
          <br />
          <button
            className="btn btn-primary notika-btn-primary waves-effect"
            onClick={this.submitForm}
          >
            LOGIN
          </button>

          <Link
            to="#l-register"
            data-ma-action="nk-login-switch"
            data-ma-block="#l-register"
            className="btn btn-login btn-success btn-float"
          >
            <i className="notika-icon notika-right-arrow right-arrow-ant" />
          </Link>
        </div>
        <div className="nk-navigation nk-lg-ic">
          <Link
            to="#"
            data-ma-action="nk-login-switch"
            data-ma-block="#l-register"
          >
            <i className="notika-icon notika-plus-symbol" />{" "}
            <span>Register</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default withAlert()(Login);
