import React, { Component } from "react";
import { domain } from "../../utils/config";
import cookie from "react-cookies";
import moment from "moment";
import UpdateProfile from "./Update";
import ChangeMyPassword from "./ChangeMyPassword";

import { withAlert } from "react-alert";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      fullname: "",
      username: "",
      birthday: "",
      level: 1,
      createAt: "",
      id: "",
      updateItem: {},
      changePasswordConfirmation: false,
      updateConfirmation: false,
      updateFullname: "",
      updateBirthday: "",
      oldPassword: "",
      newPassword: "",
    };
  }

  componentDidMount() {
    const url = domain + "auth/me";
    const fetchData = {
      mode: 'cors',
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
          if (result.status) {
            this.setState({
              fullname: result.data.fullname,
              createAt: result.data.createAt,
              birthday: result.data.birthday,
              level: result.data.level,
              username: result.data.username,
              id: result.data._id,
              isLoaded: true,
              updateFullname: result.data.fullname,
              updateBirthday: result.data.birthday,
            });
          } else {
            this.setState({
              isLoaded: true,
              error: result.data.message,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  updateConfirmModal = () => {
    const { updateItem, fullname, birthday } = this.state;
    let tmp = { ...updateItem };
    tmp.fullname = fullname;
    tmp.birthday = birthday;
    this.setState({
      updateConfirmation: true,
      updateItem: tmp,
    });
  };

  closeUpdateConfirmation = () => {
    this.setState({
      updateConfirmation: false,
    });
  };

  //Receive data from UpdateItem component.
  onUpdateDataChange = (birthday, fullname) => {
    this.setState({
      updateFullname: fullname,
      updateBirthday: birthday,
    });
  };

  updateProfile = () => {
    const { alert } = this.props;
    const { updateFullname, updateBirthday } = this.state;
    if (updateFullname === "" || updateBirthday === "") {
      alert.error("Vui lòng nhập trường dữ liệu!");
      return;
    }
    const url = domain + "auth/update_profile";
    const data = {
      birthday: updateBirthday,
      fullname: updateFullname,
    };
    const fetchData = {
      mode: 'cors',
      method: "PUT",
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
            alert.success("Cập nhật thành công!");
            this.setState({
              fullname: updateFullname,
              birthday: updateBirthday,
              updateConfirmation: false,
            });
          } else {
            alert.error("Đã xảy ra lỗi");
          }
        },
        (error) => {
          alert.error("Vui lòng thử lại");
        }
      );
  };

  changePasswordConfirmModal = () => {
    this.setState({
      changePasswordConfirmation: true,
    });
  };

  closeChangePasswordConfirmation = () => {
    this.setState({
      changePasswordConfirmation: false,
    });
  };

  onPasswordDataChange = async (oldPassword, newPassword) => {
    await this.setState({
      oldPassword,
      newPassword,
    });
  };

  submitChangePassword = () => {
    const { alert } = this.props;
    const { oldPassword, newPassword } = this.state;
    if (oldPassword.length < 5 || newPassword.length < 5) {
      alert.error("Mật khẩu phải lớn hơn 6 ký tự");
      return;
    }
    const url = domain + "auth/update_password";
    const data = {
      oldPassword,
      newPassword,
    };
    const fetchData = {
      mode: 'cors',
      method: "PUT",
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
            alert.success("Thay đổi mật khẩu thành công!");
            this.setState({
              changePasswordConfirmation: false,
            });
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
    const {
      error,
      isLoaded,
      username,
      fullname,
      birthday,
      createAt,
      level,
      id,
      updateConfirmation,
      updateFullname,
      updateBirthday,
      changePasswordConfirmation,
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
          <div className="form-example-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="form-example-wrap">
                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                        <div className="profile-img">
                          <img alt="anh-dai-dien" src="https://www.shareicon.net/data/512x512/2016/06/27/787350_people_512x512.png" />
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <div className="form-example-int">
                          <div className="form-group">
                            <label>Họ và tên: </label>&nbsp; {fullname}
                          </div>
                        </div>
                        <div className="form-example-int mg-t-15">
                          <div className="form-group">
                            <label>Username: </label>&nbsp; {username}
                          </div>
                        </div>
                        <div className="form-example-int mg-t-15">
                          <div className="form-group">
                            <label>Ngày sinh: </label>&nbsp;{" "}
                            {moment(birthday).format("DD/MM/YYYY")}
                          </div>
                        </div>
                        <div className="form-example-int mg-t-15">
                          <div className="form-group">
                            <label>Cấp bậc: </label>&nbsp;{" "}
                            <span className="nk-light-green user-level">
                              {+level === 0 ? "Super Admin" : "Thành viên"}
                            </span>
                          </div>
                        </div>
                        <div className="form-example-int mg-t-15">
                          <div className="form-group">
                            <label>Ngày tạo tài khoản: </label>&nbsp;{" "}
                            {moment(createAt).format("DD/MM/YYYY")}
                          </div>
                        </div>
                        <div className="form-example-int mg-t-15">
                          <div className="form-group">
                            <label>ID: </label>&nbsp;{" "}
                            <span className="nk-green user-id">{id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="form-example-wrap">
                    <div className="form-example-int mg-t-15">
                      <button
                        className="btn btn-success notika-btn-light-green waves-effect max-width"
                        onClick={this.updateConfirmModal}
                      >
                        Chỉnh sửa thông tin
                      </button>
                      <button
                        className="btn btn-primary notika-btn-light-blue waves-effect max-width"
                        onClick={this.changePasswordConfirmModal}
                      >
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UpdateProfile
            open={updateConfirmation}
            onClose={this.closeUpdateConfirmation}
            onSubmit={this.updateProfile}
            fullname={updateFullname}
            birthday={updateBirthday}
            onChangeUpdate={this.onUpdateDataChange}
          />
          <ChangeMyPassword
            open={changePasswordConfirmation}
            onClose={this.closeChangePasswordConfirmation}
            onSubmit={this.submitChangePassword}
            onPasswordDataChange={this.onPasswordDataChange}
          />
        </div>
      );
    }
  }
}

export default withAlert()(Profile);
