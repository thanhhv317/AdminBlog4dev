import React, { Component } from "react";

class ChangeMyPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
    };
  }
  onChange = (e, key) => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState(
      {
        [nam]: val,
      },
      () => {
        const { oldPassword, newPassword } = this.state;
        this.props.onPasswordDataChange(oldPassword, newPassword);
      }
    );
  };
  

  render() {
    const { open, onClose, onSubmit } = this.props;
    return (
      <div
        className={`modal fade ${open ? "in" : ""}`}
        style={{
          display: open ? "block" : "none",
        }}
      >
        <div className="modal-dialog modal-large">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <h2>Thay đổi mật khẩu</h2>
              <br />
              <div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <div className="nk-int-st">
                        <input
                          type="password"
                          className="form-control auto-size"
                          rows={2}
                          placeholder="Nhập mật cũ"
                          onChange={(e) => this.onChange(e, "oldPassword")}
                          name="oldPassword"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <div className="nk-int-st">
                        <input
                          type="password"
                          className="form-control auto-size"
                          rows={2}
                          placeholder="Nhập mật khẩu mới"
                          onChange={(e) => this.onChange(e, "newPassword")}
                          name="newPassword"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={onSubmit}
              >
                Lưu lại
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={onClose}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangeMyPassword;
