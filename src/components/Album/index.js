import React, { Component } from "react";
import ChildImage from "./ChildImage";
import CreateAlbum from "./Create";
import { withAlert } from "react-alert";
import _, { chunk, remove } from "lodash";
import { domain } from "../../utils/config";
import cookie from "react-cookies";
import DeleteAlbum from "./Delete";
import Pagination from "../Pagination";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createConfirmation: false,
      files: {},
      description: "",
      error: null,
      isLoaded: false,
      items: [],
      limit: 12,
      perpage: 1,
      maxPage: 10,
      minPage: 1,
      isNext: true,
      isPrevious: true,
      deleteConfirmation: false,
      removeItem: null,
    };
  }

  // BEGIN CREATE ALBUM

  createConfirmModal = () => {
    this.setState({
      createConfirmation: true,
    });
  };

  closeCreateConfirmModal = () => {
    this.setState({
      createConfirmation: false,
    });
  };

  createDescriptionChange = (des) => {
    this.setState({
      description: des,
    });
  };

  createFileChange = (file) => {
    this.setState({
      files: file,
    });
  };

  createAlbum = () => {
    const { alert } = this.props;
    const { description, files, items } = this.state;
    if (description === "" || _.isEmpty(files)) {
      alert.error("Vui lòng không được để trống dữ liệu");
      console.log(this.state);
      return;
    }
    const url = domain + "albums/create";
    let formData = new FormData();
    formData.append("image", files[0]);
    formData.append("description", description);

    let fetchData = {
      method: "POST",
      body: formData,
      headers: new Headers({
        // "Content-Type": "application/json",
        "x-access-token": cookie.load("userToken"),
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status) {
            alert.success("Thêm mới thành công!");
            let tmp = [...items];
            tmp.push(result.data.album);
            this.setState({
              description: "",
              createConfirmation: false,
              items: tmp,
            });
          } else {
            alert.show("Vui lòng thử lại!");
          }
        },
        (error) => {
          alert.error("có lỗi xảy ra");
        }
      );
  };

  // END CREATE ALBUM

  // BEGIN DELETE ALBUM

  deleteConfirmModal = (t, removeItem) => {
    this.setState({
      deleteConfirmation: t,
      removeItem,
    });
  };

  closeDeleteConfirmModal = () => {
    this.setState({
      deleteConfirmation: false,
      removeItem: {},
    });
  };

  deleteAlbum = () => {
    const { alert } = this.props;
    const { removeItem, items } = this.state;
    const url = domain + `albums/delete/${removeItem._id}`;
    const fetchData = {
      mode: 'no-cors',
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
            alert.success("xóa thành công!");
            remove(items, (item) => item._id === removeItem._id);
            this.setState({
              removeItem: {},
              deleteConfirmation: false,
            });
          } else {
            alert.error(result.data.status);
          }
        },
        (error) => {
          alert.error("Đã xảy ra lỗi, xin thử lại");
        }
      );
  };

  // END DELETE ALBUM

  // LOAD LIST ALBUM

  loadAlbums = (limit, perpage) => {
    const url = domain + `albums/list?limit=${limit}&perpage=${perpage}`;
    const fetchData = {
      mode: 'no-cors',
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
          let maxPage = Math.ceil(+result.data.count / limit);
          this.setState({
            isLoaded: true,
            items: result.data.album,
            maxPage,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  toNextPage = () => {
    const { perpage, maxPage, limit } = this.state;
    if (perpage < maxPage) {
      this.setState({
        perpage: perpage + 1,
        isNext: true,
      });
      this.loadAlbums(limit, perpage + 1);
    } else {
      this.setState({
        isNext: false,
      });
    }
  };

  toPreviousPage = () => {
    const { perpage, limit } = this.state;
    if (perpage > 1) {
      this.setState({
        perpage: perpage - 1,
        isPrevious: true,
      });
      this.loadAlbums(limit, perpage - 1);
    } else {
      this.setState({
        isPrevious: false,
      });
    }
  };

  componentDidMount() {
    const { limit, perpage } = this.state;
    this.loadAlbums(limit, perpage);
  }

  render() {
    const {
      createConfirmation,
      description,
      error,
      isLoaded,
      items,
      deleteConfirmation,
      perpage,
      maxPage,
    } = this.state;
    const albums = chunk(items, 4);
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
        <div className="data-table-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="contact-list">
                  <button
                    className="btn btn-primary notika-btn-primary waves-effect"
                    onClick={this.createConfirmModal}
                  >
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>
            <br></br>
            {albums.map((items, index) => {
              return (
                <div className="row" key={index}>
                  {items.map((x, i) => {
                    return (
                      <ChildImage
                        key={i}
                        album={x}
                        albumIndexRow={index}
                        deleteItem={this.deleteConfirmModal}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <CreateAlbum
            open={createConfirmation}
            onClose={this.closeCreateConfirmModal}
            createDescriptionChange={this.createDescriptionChange}
            createFileChange={this.createFileChange}
            onSubmit={this.createAlbum}
            description={description}
          />
          <DeleteAlbum
            open={deleteConfirmation}
            onClose={this.closeDeleteConfirmModal}
            onSubmit={this.deleteAlbum}
          />
          {maxPage > 1 ? (
            <Pagination
              onNext={() => this.toNextPage()}
              onPrevious={() => this.toPreviousPage()}
              perpage={perpage}
              maxPage={maxPage}
            />
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

export default withAlert()(Album);
