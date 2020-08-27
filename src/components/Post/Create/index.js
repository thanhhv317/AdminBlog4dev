import React, { Component } from 'react';

class CreatePost extends Component {
    render() {
        return (
        <div>
            <div className="form-example-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="form-example-wrap">
                            <div className="form-example-int">
                                <div className="form-group">
                                <label>Tiêu đề</label>
                                <div className="nk-int-st">
                                    <input type="text" className="form-control input-sm" placeholder="Nhập tiêu đề" />
                                </div>
                                </div>
                            </div>
                            <div className="form-example-int mg-t-15">
                                <div className="form-group">
                                <label>Thể loại</label>
                                <div className="nk-int-st">
                                <select className="js-example-basic-multiple form-control input-sm"  name="category[]" multiple="multiple">
                                    <option value="AL">Alabama</option>
                                    <option value="WY">Wyoming</option>
                                    <option value="WY2">Wyoming2</option>
                                </select>
                                </div>
                                </div>
                            </div>
                            <div className="form-example-int mg-t-15">
                                <div className="form-group">
                                <label>Nội dung</label>
                                <div className="nk-int-st">
                                <textarea className="form-control" rows={5} placeholder="Sẽ thay bằng ckeditor khi biết" defaultValue={""} />

                                </div>
                                </div>
                            </div>

                            <div className="form-example-int mg-t-15">
                                <div className="form-group">
                                <label>Ảnh đại diện</label>
                                <div className="nk-int-st">
                                    <input type="file"/>
                                </div>
                                </div>
                            </div>

                            <div className="form-example-int mg-t-15">
                                <button className="btn btn-success notika-btn-success">Submit</button>
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

export default CreatePost;