import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div className="nk-block" id="l-register">
                <div className="nk-form">
                    <div className="input-group">
                    <span className="input-group-addon nk-ic-st-pro"><i className="notika-icon notika-support" /></span>
                    <div className="nk-int-st">
                        <input type="text" className="form-control" placeholder="Username" />
                    </div>
                    </div>
                    <div className="input-group mg-t-15">
                    <span className="input-group-addon nk-ic-st-pro"><i className="notika-icon notika-mail" /></span>
                    <div className="nk-int-st">
                        <input type="text" className="form-control" placeholder="Email Address" />
                    </div>
                    </div>
                    <div className="input-group mg-t-15">
                    <span className="input-group-addon nk-ic-st-pro"><i className="notika-icon notika-edit" /></span>
                    <div className="nk-int-st">
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    </div>
                    <br/>
                    <button className="btn btn-info notika-btn-info waves-effect">REGISTER</button>
                    <a href="#l-login" data-ma-action="nk-login-switch" data-ma-block="#l-login" className="btn btn-login btn-success btn-float"><i className="notika-icon notika-right-arrow" /></a>
                </div>
                <div className="nk-navigation rg-ic-stl">
                    <a href="#" data-ma-action="nk-login-switch" data-ma-block="#l-login"><i className="notika-icon notika-right-arrow" /> <span>Sign in</span></a>
                </div>
            </div>

        );
    }
}

export default Register;