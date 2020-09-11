import React, { Component } from "react";

class BlockInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, text, icon, color } = this.props;
    return (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div
          className={`wb-traffic-inner notika-shadow sm-res-mg-t-30 tb-res-mg-t-30 alert alert-${color}`}
        >
          <div className="website-traffic-ctn">
            <h2>
              <span className="counter">{data}</span>
            </h2>
            <p>{text}</p>
          </div>
          <div className="sparkline-bar-stats1">
            <i style={{ fontSize: 35 }} className={`notika-icon ${icon}`}></i>
          </div>
        </div>
      </div>
    );
  }
}

export default BlockInfo;
