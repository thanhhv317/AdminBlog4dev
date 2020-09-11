import React, { Component } from "react";
import Parser from "html-react-parser";
import { domain } from "../../../utils/config";
import cookie from "react-cookies";
import { withAlert } from "react-alert";
import remove from "lodash/remove";
import _ from "lodash";
import DeleteItem from "../../Modal/DeleteItem";
import UpdateItem from "../../Modal/UpdateItem";

class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      removeItem: null,
      updateItem: {},
      deleteConfirmation: false,
      updateConfirmation: false,
    };
  }

  updateRow = () => {
    const alert = this.props.alert;
    const { updateItem, items } = this.state;
    const url = domain + this.props.linkAPI + `/update/${updateItem._id}`;
    const body = {
      name: updateItem.name,
      description: updateItem.description,
      status: updateItem.status,
    };
    let fetchData = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": cookie.load("userToken"),
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == true) {
            alert.success("Cập nhật thành công");
            const index = _.findIndex(
              items,
              (item) => item._id === updateItem._id
            );
            items[index] = updateItem;
            this.setState({
              items,
              updateConfirmation: false,
            });
          } else {
            alert.error("Lỗi, vui lòng thử lại!");
          }
        },
        (error) => {
          alert.error("Lỗi, vui lòng thử lại!");
        }
      );
  };

  deleteRow = async () => {
    const { alert } = this.props;
    const { items, removeItem } = this.state;
    // Delete it!
    const url = domain + this.props.linkAPI + `/delete/${removeItem}`;

    let fetchData = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": cookie.load("userToken"),
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status == true) {
            alert.success("xóa thành công!");
            remove(items, (item) => item._id === removeItem);
            this.setState({
              items,
              deleteConfirmation: false,
              removeItem: null,
            });
          } else {
            alert.error("Lỗi, vui lòng thử lại!");
          }
        },
        (error) => {
          alert.error("Lỗi, vui lòng thử lại!");
        }
      );
  };

  exportDataColumnHead = () => {
    let result = "";
    this.props.column.forEach((element) => {
      result += "<th>" + element + "</th>";
    });
    return result;
  };

  componentDidMount() {
    const url = domain + this.props.linkAPI + "/list";
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
            items: result.data.category,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  confirmModal = (_id) => {
    this.setState({
      deleteConfirmation: true,
      removeItem: _id,
    });
  };

  closeDeleteConfirmation = () => {
    this.setState({
      deleteConfirmation: false,
      removeItem: null,
    });
  };

  updateConfirmModal = (item) => {
    this.setState({
      updateConfirmation: true,
      updateItem: item,
    });
  };

  closeUpdateCOnfirmation = () => {
    this.setState({
      updateConfirmation: false,
      updateItem: {},
    });
  };

  onUpdateDataChange = (data) => {
    this.setState({
      updateItem: data,
    });
  };

  render() {
    const {
      error,
      isLoaded,
      items,
      deleteConfirmation,
      updateConfirmation,
      updateItem,
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
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
        <div className="data-table-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="data-table-list">
                  <div className="basic-tb-hd">
                    <h4>{this.props.title}</h4>
                    <p>{this.props.description}</p>
                  </div>
                  <div className="table-responsive">
                    <table
                      id="data-table-basic"
                      className="table table-striped"
                    >
                      <thead>
                        <tr>{Parser(this.exportDataColumnHead())}</tr>
                      </thead>
                      <tbody>
                        {items.map((item) => {
                          return (
                            <tr key={item._id}>
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td>
                                {item.status === "ACTIVE" ? (
                                  <div className="alert alert-success">
                                    {item.status}
                                  </div>
                                ) : (
                                  <div className="alert alert-info">
                                    {item.status}
                                  </div>
                                )}
                              </td>
                              <td>
                                <a
                                  onClick={() => this.updateConfirmModal(item)}
                                >
                                  <i
                                    className="notika-icon notika-draft"
                                    style={{ marginRight: "10px" }}
                                  ></i>
                                </a>
                                <a onClick={() => this.confirmModal(item._id)}>
                                  <i
                                    className="notika-icon notika-trash"
                                    style={{ marginRight: "10px" }}
                                  ></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DeleteItem
            open={deleteConfirmation}
            onSubmit={this.deleteRow}
            onClose={this.closeDeleteConfirmation}
          />
          <UpdateItem
            open={updateConfirmation}
            onSubmit={this.updateRow}
            onChangeUpdate={this.onUpdateDataChange}
            onClose={this.closeUpdateCOnfirmation}
            updateItem={{ ...updateItem }}
          />
        </div>
      );
    }
  }
}

export default withAlert()(DataList);
