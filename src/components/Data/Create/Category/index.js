import React, { Component } from 'react'
import cookie from 'react-cookies'
import { domain } from '../../../../utils/config'
import { withAlert } from 'react-alert'



class CreateCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            title: '',
            description: ''
        }
    }

    myChangeHandle = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({[nam]: val})
    }
    
    mySubmitForm = () => {

        const alert = this.props.alert;

        let title = this.state.title
        let description = this.state.description
        if (title === "" || description === "") {
            alert.show('Vui lòng nhập thông tin!') 
        } else {
            const url = `${domain}categories/create`

            let data = {
                name: title,
                description
            }

            let fetchData = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "x-access-token": cookie.load('userToken')
                })
            }

            fetch(url, fetchData)
            .then((res) => res.json())
            .then(
                (result) => {
                    if(result.status == true) {
                        alert.success('Thêm mới thành công!')                
                        console.log(result)
                    } else{
                        alert.error('Lỗi, vui lòng thử lại!')  
                    }
                },
                (error) => {
                    console.log(error)
                    alert.error('Lỗi, vui lòng thử lại!') 
                }
            )

        }
    }

    render() {
        return (
            <div>
            <div className="form-example-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="form-example-wrap">
                            <div className="form-example-int">
                                <div className="form-group">
                                <label>Tiêu đề</label>
                                <div className="nk-int-st">
                                    <input type="text" className="form-control input-sm" name="title" placeholder="Nhập tiêu đề" onChange={this.myChangeHandle} />
                                </div>
                                </div>
                            </div>
                            <div className="form-example-int mg-t-15">
                                <div className="form-group">
                                <label>Nội dung</label>
                                <div className="nk-int-st">
                                <textarea className="form-control" rows={5} name="description" placeholder="Nhập nội dung mô tả" defaultValue={""} onChange={this.myChangeHandle}/>

                                </div>
                                </div>
                            </div>
                            <div className="form-example-int mg-t-15">
                                <button className="btn btn-success notika-btn-success" onClick={this.mySubmitForm}>Submit</button>
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

export default withAlert()(CreateCategory);