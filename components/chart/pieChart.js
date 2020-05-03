import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'
import Sheetapi from '../../config/api'
import { useMediaQuery } from 'react-responsive';

const PieChart = props => {

    const isBigScreen = useMediaQuery({ minDeviceWidth: 1281 })
    const isMobile = useMediaQuery({ maxWidth: 1280 })
    const isSmallScreen = useMediaQuery({ maxWidth: 576 })

    const [options, setOptions] = useState({
        title: {
            text: "เพศชาย"
        },
        dataLabels: { enabled: false },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " คน"
                }
            }
        },
        legend: {
            position: 'bottom'
        },
        responsive: [{
            breakpoint: 992,
            options: {
                legend: {
                    offsetY: 50,
                    itemMargin: {
                        horizontal: 1,
                        vertical: 1
                    },
                },
            },
        }],
        labels: ["อายุน้อยกว่า 60 ปี",
            "อายุ 60 ถึง 69 ปี",
            "อายุ 70 ถึง 79 ปี",
            "อายุ 80 ถึง 89 ปี",
            "อายุมากกว่าหรือเท่ากับ 90 ปี"]
    })

    const [series, setSeries] = useState([20, 20, 20, 20])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {

        let userOauth = await JSON.parse(localStorage.getItem("myOauth"))

        await namelist(userOauth.data.access_token, 'ข้อมูลการวิเคราะห์ทางสถิติ!E9:E13')
        await listData(userOauth.data.access_token, 'ข้อมูลการวิเคราะห์ทางสถิติ!G9:G13')

    }

    const namelist = async (token, value) => {
        try {
            var list = await Sheetapi.getSheet(token, value)

            setOptions({
                title: {
                    text: "เพศชาย"
                },
                dataLabels: { enabled: false },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " คน"
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                },
                labels: _.flatten(list)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const listData = async (token, value) => {
        try {

            var result = await Sheetapi.getSheet(token, value)
            var data = _.flatten(result).map(Number)
            setSeries(data)
        } catch (err) {
            props.onToken(true)
        }
    }
    return (
        <React.Fragment>
            {
                isBigScreen ?
                    <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width="400"
                        height="200"
                    />
                    :
                    isMobile ?
                        <Chart
                            options={options}
                            series={series}
                            type="donut"
                            width="300"
                            height="200"
                        />
                        :
                        isSmallScreen ?
                            <Chart
                                options={options}
                                series={series}
                                type="donut"
                                width="200"
                                height="100"
                            />
                            :
                            null
            }
        </React.Fragment>
    )
}
export default PieChart;
