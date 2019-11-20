import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import Sheetapi from '../../config/api'

class BarEconomy extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {},
      series: [],
      dataList: [],
      dataName: []
    }
  }

  async componentDidMount() {
    let userOauth = JSON.parse(localStorage.getItem("myOauth"))
    this.access_token = userOauth.data.access_token
    await this.namelist('ข้อมูลการวิเคราะห์ทางสถิติ!T47:T49')
    await this.numberlist('ข้อมูลการวิเคราะห์ทางสถิติ!U47:U49')
  }

  namelist = async (value) => {

    try {

      this.list = await Sheetapi.getSheet(this.access_token, value)

      for (let i = 0; i < this.list.length; i++) {

        this.setState(prevState => ({
          dataName: [...prevState.dataName, this.list[i][0]],
        }))
      }

      this.setState({

        options: {
          title: {
            text: 'รายจ่าย',
            align: 'left'
          },
          plotOptions: {
            bar: { horizontal: true }
          },
          dataLabels: { enabled: false },
          xaxis: {
            categories: this.state.dataName,
            title: {
              text: 'จำนวน (คน)'
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + " คน"
              }
            }
          },
        }

      })


    } catch (err) {
      console.log(err);
    }

  }

  numberlist = async (value) => {

    try {

      this.list = await Sheetapi.getSheet(this.access_token, value)

      for (let i = 0; i < this.list.length; i++) {
        this.setState(prevState => ({
          dataList: [...prevState.dataList, parseInt(this.list[i][0])],
        }))
      }

      this.setState({
        series: [{ name: "จำนวน", data: this.state.dataList }],
      })

    } catch (err) {
      console.log(err);
    }

  }

  render() {

    return (
      <div className="warp-chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="400"
          width="700"
        />
      </div>
    );
  }
}

export default BarEconomy;