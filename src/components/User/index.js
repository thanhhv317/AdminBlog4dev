import React, { Component } from "react";

import { domain } from "../../utils/config";
import cookie from "react-cookies";
import { withAlert } from "react-alert";
import DataTable from "react-data-table-component";
import _ from "lodash";
import moment from "moment";
import remove from "lodash/remove";
import TextField from "@material-ui/core/TextField";
import UpdateUser from "./Update";
import DeleteItem from "../Modal/DeleteItem";
import ChangePassword from "./ChangePassword";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      totalRows: 0,
      perPage: 10,
      filter: "",
      updateConfirm: false,
      updateItem: {
        fullname: "",
      },
      deleteConfirm: false,
      removeItem: {},
      changePasswordConfirm: false,
      changePasswordId: "",
      changePasswordData: "",
    };
  }

  componentDidMount() {
    const { perPage } = this.state;

    this.setState({ loading: true });
    const url = domain + `users/list?page=1&perpage=${perPage}`;

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
          this.setState({
            items: result.data.users,
            loading: false,
            totalRows: result.data.total,
          });
        },
        (error) => {}
      );
  }

  columns = [
    {
      name: "Họ tên",
      selector: "fullname",
      sortable: true,
      cell: (row) => <div>{row.fullname}</div>,
    },
    {
      name: "Ngày sinh",
      selector: "birthday",
      sortable: true,
      cell: (row) => <div>{moment(row.birthday).format("DD/MM/YYYY")}</div>,
    },
    {
      name: "Tên đăng nhập",
      selector: "username",
      sortable: true,
    },
    {
      name: "Quyền",
      selector: "level",
      sortable: true,
    },
    {
      name: "Ngày tạo",
      sortable: true,
      selector: "createdAt",
      cell: (row) => (
        <span>{moment(row.createdAt).format("hh:mm MM-DD-YYYY")}</span>
      ),
    },
    {
      name: "Trạng thái",
      sortable: true,
      selector: "status",
      cell: (row) => (
        <div
          className={
            row.status === "ACTIVE" ? "status-active" : "status-inactive"
          }
        >
          {row.status === "ACTIVE" ? "Đã phê duyệt" : "Chưa phê duyệt"}
        </div>
      ),
    },
    {
      name: "Chức năng",
      sortable: false,
      cell: (row) => (
        <div>
          <b
            className="btn-hover-cursor"
            onClick={() => this.updateConfirmModal(row)}
          >
            <i
              className="notika-icon notika-draft"
              style={{ marginRight: "10px" }}
            ></i>
          </b>
          <b
            className="btn-hover-cursor"
            onClick={() => this.deleteConfirmModal(row._id)}
          >
            <i
              className="notika-icon notika-trash"
              style={{ marginRight: "10px" }}
            ></i>
          </b>
          <b
            className="btn-hover-cursor"
            onClick={() => this.changePasswordConfirmModal(row._id)}
          >
            <i className="notika-icon notika-settings"></i>
          </b>
        </div>
      ),
      right: true,
    },
  ];

  changePasswordConfirmModal = (id) => {
    this.setState({
      changePasswordConfirm: true,
      changePasswordId: id,
    });
  };

  closeChangePasswordConfirmModal = () => {
    this.setState({
      changePasswordConfirm: false,
      changePasswordId: "",
      changePasswordData: "",
    });
  };

  onUpdatePasswordChange = (data) => {
    this.setState({
      changePasswordData: data,
    });
  };

  changePassword = () => {
    const { changePasswordData, changePasswordId } = this.state;
    const alert = this.props.alert;
    if (changePasswordData === "" || changePasswordData.length < 6) {
      alert.error("Mật khẩu phải lớn hơn 6 ký tự");
      return;
    }
    const url = domain + `users/change_password/${changePasswordId}`;
    const body = {
      password: changePasswordData,
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
          if (result.status === true) {
            alert.success("Thay đổi mật khẩu thành công");

            this.setState({
              changePasswordData: "",
              changePasswordId: "",
              changePasswordConfirm: false,
            });
          } else {
            alert.error(result.data.message);
          }
        },
        (error) => {
          alert.error("Lỗi, vui lòng thử lại!");
        }
      );
  };

  updateConfirmModal = (data) => {
    this.setState({
      updateConfirm: true,
      updateItem: data,
    });
  };

  closeUpdateConfirmModal = () => {
    this.setState({
      updateConfirm: false,
    });
  };

  onUpdateDataChange = (data) => {
    this.setState({
      updateItem: data,
    });
  };

  updateRow = () => {
    const alert = this.props.alert;
    const { updateItem, items } = this.state;
    const url = domain + `users/update/${updateItem._id}`;
    const body = {
      fullname: updateItem.fullname,
      email: updateItem.email,
      birthday: updateItem.birthday,
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
          if (result.status === true) {
            alert.success("Cập nhật thành công");
            const index = _.findIndex(
              items,
              (item) => item._id === updateItem._id
            );
            items[index] = updateItem;
            this.setState({
              items: [...items],
              updateConfirm: false,
            });
          } else {
            alert.error(result.data.message);
          }
        },
        (error) => {
          alert.error("Lỗi, vui lòng thử lại!");
        }
      );
  };

  //DELETE

  deleteConfirmModal = (id) => {
    this.setState({
      deleteConfirm: true,
      removeItem: id,
    });
  };

  closeDeleteConfirmation = () => {
    this.setState({
      deleteConfirm: false,
      removeItem: null,
    });
  };

  deleteRow = () => {
    const { removeItem, items } = this.state;
    const { alert } = this.props;
    const url = domain + `users/delete/${removeItem}`;

    const fetchData = {
      mode: 'cors',
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
          if (result.status) {
            alert.success("Xóa thành công!");
            remove(items, (item) => item._id === removeItem);
            this.setState({
              removeItem: null,
              items: [...items],
              deleteConfirm: false,
            });
          }
        },
        (error) => {}
      );
  };

  //PAGINATION
  handlePageChange = async (page) => {
    const { perPage } = this.state;

    this.setState({ loading: true });

    const url = domain + `users/list?page=${page}&perpage=${perPage}`;

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
          this.setState({
            loading: false,
            items: result.data.users,
          });
        },
        (error) => {}
      );
  };

  handlePerRowsChange = async (perPage, page) => {
    this.setState({ loading: true });

    const url = domain + `users/list?page=${page}&perpage=${perPage}`;

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
          this.setState({
            loading: false,
            items: result.data.users,
            perPage,
          });
        },
        (error) => {}
      );
  };

  filterData = (e) => {
    const fil = e.target.value;
    this.setState({
      filter: fil,
      loading: true,
    });
    const { perPage } = this.state;

    const url = domain + `users/list?page=${1}&perpage=${perPage}&find=${fil}`;

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
          this.setState({
            loading: false,
            items: result.data.users,
            perPage,
            totalRows: result.data.total,
          });
        },
        (error) => {}
      );
  };

  render() {
    const {
      items,
      loading,
      totalRows,
      updateConfirm,
      updateItem,
      deleteConfirm,
      changePasswordConfirm,
      changePasswordData,
    } = this.state;
    return (
      <div className="data-table-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="data-table-list">
                <div className="table-responsive">
                  <DataTable
                    keyField="_id"
                    columns={this.columns}
                    data={items}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={this.handlePerRowsChange}
                    onChangePage={this.handlePageChange}
                    highlightOnHover
                    persistTableHead
                    noHeader
                    subHeader
                    subHeaderComponent={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          id="outlined-basic"
                          label="Search"
                          variant="outlined"
                          size="small"
                          style={{ margin: "5px" }}
                          onChange={(e) => this.filterData(e)}
                        />
                      </div>
                    }
                    subHeaderAlign="right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <UpdateUser
          open={updateConfirm}
          onClose={this.closeUpdateConfirmModal}
          onChangeUpdate={this.onUpdateDataChange}
          onSubmit={this.updateRow}
          updateItem={{ ...updateItem }}
        />
        <DeleteItem
          open={deleteConfirm}
          onSubmit={this.deleteRow}
          onClose={this.closeDeleteConfirmation}
        />
        <ChangePassword
          open={changePasswordConfirm}
          onClose={this.closeChangePasswordConfirmModal}
          onChangeUpdate={this.onUpdatePasswordChange}
          onSubmit={this.changePassword}
          changePasswordData={changePasswordData}
        />
      </div>
    );
  }
}

export default withAlert()(UserList);
