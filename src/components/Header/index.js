import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import cookie from "react-cookies";

class Header extends Component {
  logout = () => {
    this.props.onLoggedOut();
  };

  render() {
    return (
      <div className="header-top-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="logo-area">
                <Link to="#">
                  <img src="img/logo/logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <div className="header-top-menu">
                <ul className="nav navbar-nav notika-top-nav">
                  <li className="nav-item">
                    <Link
                      to="#"
                      data-toggle="dropdown"
                      role="button"
                      aria-expanded="false"
                      className="nav-link dropdown-toggle"
                    >
                      <span>
                        <i className="notika-icon notika-chat" />
                      </span>
                    </Link>
                    <div
                      role="menu"
                      className="dropdown-menu message-dd chat-dd animated zoomIn"
                    >
                      <div className="hd-mg-tt">
                        <h2>Thông tin cá nhân</h2>
                      </div>
                      <div className="hd-message-info">
                        <Link to="/profile">
                          <div className="hd-message-sn">
                            <div className="hd-message-img">
                              
                            </div>
                            <div className="hd-mg-ctn">
                              <h3>{cookie.load("username")}</h3>
                              <p>Tham gia: {moment(cookie.load("usercreatedAt")).format("DD/MM/YYYY")}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="hd-mg-va">
                        <Link to="#" onClick={this.logout}>
                          Đăng xuất
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
