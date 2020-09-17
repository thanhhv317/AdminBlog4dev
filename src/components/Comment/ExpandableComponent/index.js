import React, { Component } from "react";

class ExpandableComponent extends Component {
  render() {
    const { data } = this.props;
    return <div>{data.comment}</div>;
  }
}

export default ExpandableComponent;
