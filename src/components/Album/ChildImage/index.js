import React, { Component } from "react";
import { domain } from "../../../utils/config";
import { withAlert } from "react-alert";

class ChildImage extends Component {
  onCopy = () => {
    const { album, alert } = this.props;
    navigator.clipboard.writeText(domain + album.image);
    alert.success("Đã copy");
  };

  deleteItem = () => {
    const { album } = this.props;
    this.props.deleteItem(true, album);
  };

  render() {
    const { album, albumIndexRow } = this.props;
    return (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div className={`contact-list ${albumIndexRow > 0 ? "mg-t-30" : ""}`}>
          <div className="contact-win">
            <div className="img-album">
              <img src={domain + album.image} alt="" />
            </div>
            <div className="conct-sc-ic">
              <b className="btn waves-effect" onClick={this.onCopy}>
                <i className="notika-icon notika-form" />
              </b>
              <b
                className="btn notika-btn-deeporange waves-effect"
                onClick={this.deleteItem}
              >
                <i className="notika-icon notika-trash" />
              </b>
            </div>
          </div>
          <div className="contact-ctn">
            <div className="contact-ad-hd">
              <p className="ctn-ads link-album">{domain + album.image}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(ChildImage);
