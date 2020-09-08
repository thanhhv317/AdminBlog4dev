import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class MainMenuNav extends Component {
    render() {
        return (
            <div className="main-menu-area mg-tb-40">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <ul className="nav nav-tabs notika-menu-wrap menu-it-icon-pro">
                    <li><a data-toggle="tab" href="#Home"><i className="notika-icon notika-house" /> Trang chủ</a>
                    </li>
                    <li><a data-toggle="tab" href="#mailbox"><i className="notika-icon notika-star" /> Bài viết</a>
                    </li>
                    <li><a data-toggle="tab" href="#Interface"><i className="notika-icon notika-promos" />Thể loại</a>
                    </li>
                    <li><a data-toggle="tab" href="#Charts"><i className="notika-icon notika-form" />Bình luận</a>
                    </li>
                    <li><a data-toggle="tab" href="#Tables"><i className="notika-icon notika-support" />Người dùng</a>
                    </li>
                    <li><a data-toggle="tab" href="#Forms"><i className="notika-icon notika-bar-chart" />Thống kê</a>
                    </li>
                    <li><a data-toggle="tab" href="#Appviews"><i className="notika-icon notika-app" /> Thiết lập</a>
                    </li>
                    
                  </ul>
                  <div className="tab-content custom-menu-content">
                    <div id="Home" className="tab-pane in notika-tab-menu-bg animated flipInX">
                      <ul className="notika-main-menu-dropdown">
                        <li><NavLink to="/">Trang chủ</NavLink>
                        </li>
                      </ul>
                    </div>
                    <div id="mailbox" className="tab-pane notika-tab-menu-bg animated flipInX">
                      <ul className="notika-main-menu-dropdown">
                        <li><NavLink to="/posts">Danh sách bài viết</NavLink>
                        </li>
                        <li><NavLink to="/posts/create">Thêm mới</NavLink>
                        </li>
                      </ul>
                    </div>
                    <div id="Interface" className="tab-pane notika-tab-menu-bg animated flipInX">
                      <ul className="notika-main-menu-dropdown">
                        <li><NavLink to="/category">Danh sách thể loại</NavLink>
                        </li>
                        <li><NavLink to="/category/create">Thêm mới</NavLink>
                        </li>
                      </ul>
                    </div>
                    <div id="Charts" className="tab-pane notika-tab-menu-bg animated flipInX">
                      <ul className="notika-main-menu-dropdown">
                        <li><a href="/comments">Danh sách bình luận</a>
                        </li>
                      </ul>
                    </div>
                    <div id="Tables" className="tab-pane notika-tab-menu-bg animated flipInX">
                      <ul className="notika-main-menu-dropdown">
                        <li><a href="normal-table.html">Danh sách người dùng</a>
                        </li>
                        <li><a href="data-table.html">Thêm mới tài khoản</a>
                        </li>
                      </ul>
                    </div>
                    <div id="Forms" className="tab-pane notika-tab-menu-bg animated flipInX">
                      <ul className="notika-main-menu-dropdown">
                        <li><a href="form-elements.html">Thống kê</a>
                        </li>
                      </ul>
                    </div>
                    <div id="Appviews" className="tab-pane notika-tab-menu-bg animated flipInX">
                      <ul className="notika-main-menu-dropdown">
                        <li><a href="notification.html">Cài đặt chung</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        );
    }
}

export default MainMenuNav;