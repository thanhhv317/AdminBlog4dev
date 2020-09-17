import React, { Component } from "react";

class Breadcomb extends Component {
  render() {
    const { title, content } = this.props;
    return (
      <div className="breadcomb-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="breadcomb-list">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="breadcomb-wp">
                      <div className="breadcomb-icon">
                        <i className="notika-icon notika-windows" />
                      </div>
                      <div className="breadcomb-ctn">
                        <h2>{title}</h2>
                        <p>{content}</p>
                      </div>
                    </div>
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

export default Breadcomb;
