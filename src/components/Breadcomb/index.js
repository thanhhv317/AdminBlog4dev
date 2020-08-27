import React, { Component } from 'react';

class Breadcomb extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="breadcomb-area">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="breadcomb-list">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className="breadcomb-wp">
                                <div className="breadcomb-icon">
                                <i className="notika-icon notika-windows" />
                                </div>
                                <div className="breadcomb-ctn">
                                <h2>{this.props.title}</h2>
                                <p>{this.props.content}</p>
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-3">
                            <div className="breadcomb-report">
                                <button data-toggle="tooltip" data-placement="left" title="Download Report" className="btn"><i className="notika-icon notika-sent" /></button>
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