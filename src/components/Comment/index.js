import React, { Component } from "react";
import { Link } from "react-router-dom";
import { domain } from "../../utils/config";
import cookie from "react-cookies";
import { withAlert } from "react-alert";
import DataTable from "react-data-table-component";
import _ from "lodash";
import ExpandableComponent from "./ExpandableComponent";
import moment from "moment";
import remove from "lodash/remove";

import TextField from "@material-ui/core/TextField";

import UpdateComment from "./Update";
import DeleteItem from "../Modal/DeleteItem";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      totalRows: 0,
      perPage: 10,
      filter: "",
      updateConfirm: false,
      updateItem: {},
      deleteConfirm: false,
      removeItem: {},
    };
  }

  columns = [
    {
      name: "Họ tên",
      selector: "name",
      sortable: true,
      cell: (row) => <div>{row.name}</div>,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Ngày tạo",
      sortable: true,
      selector: "createAt",
      cell: (row) => (
        <span>{moment(row.createAt).format("hh:mm MM-DD-YYYY")}</span>
      ),
    },
    {
      name: "Bài viết",
      sortable: false,
      cell: (row) => (
        <Link
          to={`/posts/view/${row != null ? row.postId.slug : ""}.${
            row != null ? row.postId._id : ""
          }`}
        >
          {row.postId.title}
        </Link>
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
          <b className="btn-hover-cursor" onClick={() => this.updateConfirmModal(row)}>
            <i
              className="notika-icon notika-draft"
              style={{ marginRight: "10px" }}
            ></i>
          </b>
          <b className="btn-hover-cursor" onClick={() => this.deleteConfirmModal(row._id)}>
            <i
              className="notika-icon notika-trash"
              style={{ marginRight: "10px" }}
            ></i>
          </b>
        </div>
      ),
      right: true,
    },
  ];

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

  updateRow = () => {
    const alert = this.props.alert;
    const { updateItem, items } = this.state;
    const url = domain + `comments/update/${updateItem._id}`;
    const body = {
      name: updateItem.name,
      email: updateItem.email,
      comment: updateItem.comment,
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

  onUpdateDataChange = (data) => {
    this.setState({
      updateItem: data,
    });
  };

  //DELETE
  deleteConfirmModal = (id) => {
    this.setState({
      deleteConfirm: true,
      removeItem: id,
    });
  };

  deleteRow = () => {
    const { removeItem, items } = this.state;
    const { alert } = this.props;
    const url = domain + `comments/delete/${removeItem}`;

    const fetchData = {
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

  closeDeleteConfirmation = () => {
    this.setState({
      deleteConfirm: false,
      removeItem: null,
    });
  };

  componentDidMount() {
    const { perPage } = this.state;

    this.setState({ loading: true });
    const url = domain + `comments/list?page=1&perpage=${perPage}`;

    const fetchData = {
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
            items: result.data.comments,
            loading: false,
            totalRows: result.data.total,
          });
        },
        (error) => {}
      );
  }

  handlePageChange = async (page) => {
    const { perPage } = this.state;

    this.setState({ loading: true });

    const url = domain + `comments/list?page=${page}&perpage=${perPage}`;

    const fetchData = {
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
            items: result.data.comments,
          });
        },
        (error) => {}
      );
  };

  handlePerRowsChange = async (perPage, page) => {
    this.setState({ loading: true });

    const url = domain + `comments/list?page=${page}&perpage=${perPage}`;

    const fetchData = {
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
            items: result.data.comments,
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

    const url =
      domain + `comments/list?page=${1}&perpage=${perPage}&find=${fil}`;

    const fetchData = {
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
            items: result.data.comments,
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
                    expandableRows
                    expandableRowsComponent={<ExpandableComponent />}
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
                    dense
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <UpdateComment
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
      </div>
    );
  }
}

export default withAlert()(Comment);
