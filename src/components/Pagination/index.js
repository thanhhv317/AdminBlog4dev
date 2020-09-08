import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onNext, onPrevious, perpage, maxPage } = this.props;
    return (
      <div className="pagination-area">
        <div className="container">
          <div className="row pagination-list">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="pagination-button">
                trang số {perpage}/{maxPage} &nbsp;
                <button
                  onClick={onPrevious}
                  className={`btn btn-lime lime-icon-notika mg-r-20 ${
                    perpage === 1 ? "" : " waves-effect"
                  }`}
                >
                  <i className="notika-icon notika-left-arrow" />
                </button>
                <button
                  onClick={onNext}
                  className={`btn btn-lightgreen lightgreen-icon-notika ${perpage===maxPage ? "" : " waves-effect"}`}
                >
                  <i className="notika-icon notika-right-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pagination;
