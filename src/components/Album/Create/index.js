import React, { Component } from "react";

class CreateAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
    };
  }

  onChange = (e) => {
    let val = e.target.value;
    this.props.createDescriptionChange(val);
  };

  handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    this.setState(
      {
        files,
      },
      () => {
        this.props.createFileChange(this.state.files);
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
              <h2>Thêm mới dữ liệu</h2>
              <br />
              <div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label>Họ tên:</label>
                      <div className="nk-int-st">
                        <input
                          type="text"
                          className="form-control auto-size"
                          rows={2}
                          placeholder="Nhập mô tả"
                          name="description"
                          onChange={(e) => this.onChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <span>Chọn ảnh</span>
                      <div className="nk-int-st">
                        <input
                          type="file"
                          className="form-control auto-size"
                          onChange={this.handleFileSelected}
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

export default CreateAlbum;
