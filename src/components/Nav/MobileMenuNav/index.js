import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import cookie from "react-cookies";

class MobileMenuNav extends Component {
  render() {
    return (
      <div className="mobile-menu-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="mobile-menu">
                <nav id="dropdown">
                  <ul className="mobile-menu-nav">
                    <li>
                      <NavLink
                        data-toggle="collapse"
                        data-target="#Charts"
                        to="/"
                      >
                        Trang chủ
                      </NavLink>
                      <ul className="collapse dropdown-header-top">
                        <li>
                          <NavLink to="/">Trang chủ</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link
                        data-toggle="collapse"
                        data-target="#demoevent"
                        to="#"
                      >
                        Bài viết
                      </Link>
                      <ul
                        id="demoevent"
                        className="collapse dropdown-header-top"
                      >
                        <li>
                          <NavLink to="/posts">Danh sách bài viết</NavLink>
                        </li>
                        <li>
                          <NavLink to="/posts/create">Thêm mới</NavLink>
                        </li>
                      </ul>
                    </li>
                    {+cookie.load("userLevel") === 0 ? (
                      <li>
                        <Link
                          data-toggle="collapse"
                          data-target="#democrou"
                          to="#"
                        >
                          Thể loại
                        </Link>
                        <ul
                          id="democrou"
                          className="collapse dropdown-header-top"
                        >
                          <li>
                            <NavLink to="/category">Danh sách thể loại</NavLink>
                          </li>
                          <li>
                            <NavLink to="/category/create">Thêm mới</NavLink>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}
                    {+cookie.load("userLevel") === 0 ? (
                      <li>
                        <Link
                          data-toggle="collapse"
                          data-target="#demolibra"
                          to="#"
                        >
                          Bình luận
                        </Link>
                        <ul
                          id="demolibra"
                          className="collapse dropdown-header-top"
                        >
                          <li>
                            <NavLink to="/comments">
                              Danh sách bình luận
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}

                    {+cookie.load("userLevel") === 0 ? (
                      <li>
                        <Link
                          data-toggle="collapse"
                          data-target="#demodepart"
                          to="#"
                        >
                          Người dùng
                        </Link>
                        <ul
                          id="demodepart"
                          className="collapse dropdown-header-top"
                        >
                          <li>
                            <NavLink to="/users">Danh sách người dùng</NavLink>
                          </li>
                          <li>
                            <NavLink to="/users/create">
                              Thêm mới tài khoản
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      ""
                    )}

                    <li>
                      <Link data-toggle="collapse" data-target="#demo" to="#">
                        Thống kê
                      </Link>
                      <ul id="demo" className="collapse dropdown-header-top">
                        <li>
                          <NavLink to="/statistics">Thống kê</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link
                        data-toggle="collapse"
                        data-target="#Miscellaneousmob"
                        to="#"
                      >
                        Tiện ích
                      </Link>
                      <ul
                        id="Miscellaneousmob"
                        className="collapse dropdown-header-top"
                      >
                        <li>
                          <NavLink to="/opt/crawl">Crawl website</NavLink>
                        </li>
                        <li>
                          <NavLink to="/opt/album">Thư viện ảnh</NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileMenuNav;
