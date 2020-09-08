import React, { Component } from "react";

class ExpandableComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return <div>{data.comment}</div>;
  }
}

export default ExpandableComponent;
