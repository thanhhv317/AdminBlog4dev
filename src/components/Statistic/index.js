import React, { Component } from "react";
import CircleChart from "./CircleChart";

class Statistic extends Component {
  render() {
    return (
      <div className="data-table-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <CircleChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistic;
