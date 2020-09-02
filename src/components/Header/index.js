import React, { Component } from 'react';

class Header extends Component {

  constructor(props) {
    super(props);
    
  }

  logout = () => {
    this.props.onLoggedOut()
  }
  
  render() {
    return (
      <div className="header-top-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="logo-area">
                <a href="#"><img src="img/logo/logo.png" alt="" /></a>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <div className="header-top-menu">
                <ul className="nav navbar-nav notika-top-nav">


                  <li className="nav-item nc-al"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><span><i className="notika-icon notika-alarm" /></span><div className="spinner4 spinner-4" />
                    <div className="ntd-ctn">
                      <span>
                        2
                      </span>
                    </div></a>
                    <div role="menu" className="dropdown-menu message-dd notification-dd animated zoomIn">
                      <div className="hd-mg-tt">
                        <h2>Thông báo</h2>
                      </div>
                      <div className="hd-message-info">
                        <a href="#">
                          <div className="hd-message-sn">
                            <div className="hd-message-img">
                              <img src="img/post/1.jpg" alt="" />
                            </div>
                            <div className="hd-mg-ctn">
                              <h3>David Belle</h3>
                              <p>Cum sociis natoque penatibus et magnis dis parturient montes</p>
                            </div>
                          </div>
                        </a>
                        <a href="#">
                          <div className="hd-message-sn">
                            <div className="hd-message-img">
                              <img src="img/post/2.jpg" alt="" />
                            </div>
                            <div className="hd-mg-ctn">
                              <h3>Jonathan Morris</h3>
                              <p>Cum sociis natoque penatibus et magnis dis parturient montes</p>
                            </div>
                          </div>
                        </a>
                        <a href="#">
                          <div className="hd-message-sn">
                            <div className="hd-message-img">
                              <img src="img/post/4.jpg" alt="" />
                            </div>
                            <div className="hd-mg-ctn">
                              <h3>Fredric Mitchell</h3>
                              <p>Cum sociis natoque penatibus et magnis dis parturient montes</p>
                            </div>
                          </div>
                        </a>
                        <a href="#">
                          <div className="hd-message-sn">
                            <div className="hd-message-img">
                              <img src="img/post/1.jpg" alt="" />
                            </div>
                            <div className="hd-mg-ctn">
                              <h3>David Belle</h3>
                              <p>Cum sociis natoque penatibus et magnis dis parturient montes</p>
                            </div>
                          </div>
                        </a>
                        <a href="#">
                          <div className="hd-message-sn">
                            <div className="hd-message-img">
                              <img src="img/post/2.jpg" alt="" />
                            </div>
                            <div className="hd-mg-ctn">
                              <h3>Glenn Jecobs</h3>
                              <p>Cum sociis natoque penatibus et magnis dis parturient montes</p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="hd-mg-va">
                        <a href="#">View All</a>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><span><i className="notika-icon notika-chat" /></span></a>
                    <div role="menu" className="dropdown-menu message-dd chat-dd animated zoomIn">
                      <div className="hd-mg-tt">
                        <h2>Thông tin cá nhân</h2>
                      </div>
                      <div className="hd-message-info">
                        <a href="#">
                          <div className="hd-message-sn">
                            <div className="hd-message-img">
                              <img src="img/post/1.jpg" alt="" />
                            </div>
                            <div className="hd-mg-ctn">
                              <h3>Hoàng Thành</h3>
                              <p>Tham gia: 19/8/2020</p>
                            </div>
                          </div>
                        </a>

                      </div>
                      <div className="hd-mg-va">
                        <a href="#" onClick={this.logout}>Đăng xuất</a>
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