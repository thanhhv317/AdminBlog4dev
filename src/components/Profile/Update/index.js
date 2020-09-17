import React, { Component } from "react";
import moment from "moment";

class UpdateProfile extends Component {
  onChange = (e, key) => {
    let { birthday, fullname } = this.props;
    if (key === "birthday") {
      birthday = e.target.value;
    } else {
      fullname = e.target.value;
    }

    this.props.onChangeUpdate(birthday, fullname);
  };

  render() {
    const { open, onClose, onSubmit, birthday, fullname } = this.props;
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
              <h2>Cập nhật dữ liệu</h2>
              <br />
              <div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label>Họ tên:</label>
                      <div className="nk-int-st">
                        <input
                          type="text"
                          onChange={(e) => this.onChange(e, "fullname")}
                          className="form-control auto-size"
                          name="fullname"
                          rows={2}
                          placeholder="Nhập họ tên"
                          value={fullname}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <span>Ngày sinh:</span>
                      <div className="nk-int-st">
                        <input
                          type="date"
                          className="form-control auto-size"
                          rows={2}
                          value={moment(birthday).format("yyyy-MM-DD")}
                          onChange={(e) => this.onChange(e, "birthday")}
                          placeholder="Ngày sinh"
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

export default UpdateProfile;
