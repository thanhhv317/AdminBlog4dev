import React, { Component } from 'react';
import CrawlWebsite from './CrawlWebstie';

class Opt extends Component {
    render() {
        return (
            <div className="data-table-area">
            <div className="container">
              <div className="row">
                  <CrawlWebsite />
              </div>
            </div>
          </div>
        );
    }
}

export default Opt;