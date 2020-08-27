import React, { Component } from 'react';
import Parser from 'html-react-parser';
import { domain } from '../../../utils/config'
import cookie from 'react-cookies'


class DataList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }

    exportDataColumnHead = () => {
      let result = ''
      this.props.column.forEach(element => {
        result += '<th>' + element + '</th>'
      });
      return result
    }

    componentDidMount() {
      const url = domain + this.props.linkAPI
      let fetchData = {
        method: 'GET',
        headers: new Headers({
            "Content-Type": "application/json",
            "x-access-token": cookie.load('userToken')
        })
      }

      fetch(url, fetchData)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result.data.category
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    }
    
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="data-table-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="data-table-list">
                      <div className="basic-tb-hd">
                        <h2>{this.props.title}</h2>
                        <p>{this.props.description}</p>
                      </div>
                      <div className="table-responsive">
                        <table id="data-table-basic" className="table table-striped">
                          <thead>
                            <tr>
                              {/* <th>Name</th>
                              <th>Position</th>
                              <th>Office</th>
                              <th>Age</th>
                              <th>Start date</th>
                              <th>Salary</th> */}
                              {
                                Parser(this.exportDataColumnHead())
                              }
                            </tr>
                          </thead>
                          <tbody>
                            {
                              items.map(item => {
                                return <tr key={item._id}>
                                  <td>{item.name}</td>
                                  <td>{item.description}</td>
                                  <td>
                                  {
                                  (item.status === "ACTIVE")? <div className="alert alert-success">{item.status}</div> : <div className="alert alert-info">{item.status}</div>
                                  }
                                  </td>
                                  <td>
                                    <a><i className="notika-icon notika-draft" style={{marginRight: '5px'}}></i></a>
                                    <a><i className="notika-icon notika-trash" style={{marginRight: '5px'}}></i></a>
                                  </td>
                                </tr>
                              })
                            }
                          </tbody>
                          
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        );
      }
    }
}

export default DataList;