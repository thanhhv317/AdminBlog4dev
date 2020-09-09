import React, { Component } from "react";
import moment from 'moment'
import Update from "../../Post/Update";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
  }
  onChange = (e, key) => {
    const { updateItem } = this.props;
    if (key === "status") {
      updateItem.status = e.target.checked ? "ACTIVE" : "INACTIVE";
    } else {
      updateItem[key] = e.target.value;
    }
    this.props.onChangeUpdate(updateItem);
  };

  render() {
    const { open, onClose, updateItem, onSubmit } = this.props;
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
                      <div className="nk-int-st">
                        <input
                          type="text"
                          className="form-control auto-size"
                          rows={2}
                          placeholder="Họ và tên."
                          value={updateItem.fullname}
                          onChange={(e) => this.onChange(e, "fullname")}
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
                          value={moment(updateItem.birthday).format("yyyy-MM-DD")}
                          onChange={(e) => this.onChange(e, "birthday")}
                          placeholder="Ngày sinh"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
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
                              onChange={(e) => this.onChange(e, "status")}
                              checked={updateItem.status === "ACTIVE"}
                            />
                            <label htmlFor="ts2" className="ts-helper" />
                          </div>
                        </div>
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

export default UpdateUser;
