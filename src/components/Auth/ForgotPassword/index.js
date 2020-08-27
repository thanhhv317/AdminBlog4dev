import React, { Component } from 'react';

class ForgotPassword extends Component {
    render() {
        return (
            <div className="nk-block" id="l-forget-password">
                <div className="nk-form">
                    <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu risus. Curabitur commodo lorem fringilla enim feugiat commodo sed ac lacus.</p>
                    <div className="input-group">
                    <span className="input-group-addon nk-ic-st-pro"><i className="notika-icon notika-mail" /></span>
                    <div className="nk-int-st">
                        <input type="text" className="form-control" placeholder="Email Address" />
                    </div>
                    </div>
                    <a href="#l-login" data-ma-action="nk-login-switch" data-ma-block="#l-login" className="btn btn-login btn-success btn-float"><i className="notika-icon notika-right-arrow" /></a>
                </div>
                <div className="nk-navigation nk-lg-ic rg-ic-stl">
                    <a href data-ma-action="nk-login-switch" data-ma-block="#l-login"><i className="notika-icon notika-right-arrow" /> <span>Sign in</span></a>
                    <a href data-ma-action="nk-login-switch" data-ma-block="#l-register"><i className="notika-icon notika-plus-symbol" /> <span>Register</span></a>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;