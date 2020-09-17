import React, { Component } from "react";
import CanvasJSReact from "../../../lib/canvasjs.react";
import { domain } from "../../../utils/config";
import cookie from "react-cookies";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CircleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      error: null,
      items: [],
      total: 1,
    };
  }

  componentDidMount() {
    const url = domain + "statistics/total_post";
    const fetchData = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": cookie.load("userToken"),
      }),
    };

    fetch(url, fetchData)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status) {
            this.setState({
              isLoaded: true,
              items: result.data,
              total: result.data.total,
            });
          }
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }
  render() {
    const { items, total } = this.state;
    let objData = [];

    let keys = ["Kích hoạt", "Chưa kích hoạt", "Đã xóa"];
    let values = Object.values(items);

    for (let i = 0; i < values.length - 1; ++i) {
      objData.push({ y: values[i], label: keys[i] });
    }
    let tmp = objData.map((x) => {
      return { y: Math.round((x.y / total) * 100 * 100) / 100, label: x.label };
    });

    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Biểu đồ thống kê số lượng bài viết",
      },
      data: [
        {
          type: "pie",
          indexLabel: "{label}: {y}%",
          startAngle: -90,
          dataPoints: tmp,
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default CircleChart;
