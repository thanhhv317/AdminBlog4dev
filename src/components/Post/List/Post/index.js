import React, { Component } from 'react';

class Post extends Component {
    render() {
        return (
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div className="animation-single-int">
                    <div className="animation-ctn-hd">
                    <h2>Attention Seekers</h2>
                    <p>Click on the buttons below to start the animation action in image.</p>
                    </div>
                    <div className="animation-img mg-b-15">
                    <img className="animate-one" src="http://via.placeholder.com/500x300" alt="" />
                    </div>
                    <div className="animation-action">
                    <div className="row">
                        <div className="col-lg-6">
                        <div className="animation-btn">
                            <button className="btn ant-nk-st bounce-ac">bounce</button>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="animation-btn sm-res-mg-t-10 tb-res-mg-t-10 dk-res-mg-t-10">
                            <button className="btn ant-nk-st flash-ac">flash</button>
                        </div>
                        </div>
                    </div>
                    <div className="row mg-t-10">
                        <div className="col-lg-6">
                        <div className="animation-btn">
                            <button className="btn ant-nk-st pulse-ac">pulse</button>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="animation-btn sm-res-mg-t-10 tb-res-mg-t-10 dk-res-mg-t-10">
                            <button className="btn ant-nk-st rubberBand-ac">rubberBand</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;