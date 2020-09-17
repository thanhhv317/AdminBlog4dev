import React, { Component } from "react";
import cookie from "react-cookies";
import { domain } from "../../../../utils/config";
import { withAlert } from "react-alert";

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      name: "",
      description: "",
    };
    this.creating = false;
  }

  myChangeHandle = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  mySubmitForm = () => {
    if (this.creating) return;
    const { name, description } = this.state;
    this.creating = true;

    const alert = this.props.alert;

    if (name === "" || description === "") {
      alert.show("Vui lòng nhập thông tin!");
    } else {
      const url = `${domain}categories/create`;

      let data = {
        name,
        description,
      };

      let fetchData = {
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
            this.creating = false;
            if (result.status === true) {
              this.setState({
                name: "",
                description: "",
              });
              alert.success("Thêm mới thành công!");
            } else {
              alert.error("Lỗi, vui lòng thử lại!");
            }
          },
          (error) => {
            this.creating = false;
            alert.error("Lỗi, vui lòng thử lại!");
          }
        );
    }
  };

  render() {
    const { name, description } = this.state;
    return (
      <div>
        <div className="form-example-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="form-example-wrap">
                  <div className="form-example-int">
                    <div className="form-group">
                      <label>Tên thể loại</label>
                      <div className="nk-int-st">
                        <input
                          value={name}
                          type="text"
                          className="form-control input-sm"
                          name="name"
                          placeholder="Nhập tên thể loại"
                          onChange={this.myChangeHandle}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-example-int mg-t-15">
                    <div className="form-group">
                      <label>Nội dung</label>
                      <div className="nk-int-st">
                        <textarea
                          value={description}
                          className="form-control"
                          rows={5}
                          name="description"
                          placeholder="Nhập nội dung mô tả"
                          onChange={this.myChangeHandle}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-example-int mg-t-15">
                    <button
                      className="btn btn-success notika-btn-success"
                      onClick={this.mySubmitForm}
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

export default withAlert()(CreateCategory);
