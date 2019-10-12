import React from 'react'
import Sheetapi from '../config/api'
import CardMain from '../components/layout/cardmain';


class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           

            status: true

        }
    }

    async componentDidMount() {

    }


    toggle = async () => {
        if (!this.state.status) {
            await this.setState({
                status: true
            })
        }
        else {
            await this.setState({
                status: false
            })
        }
    }

    render() {

        return (

            <div className="warp-main">
                <div className={`wrapper${this.state.status ? " menuDisplayed" : ""}`}>
                    <div className="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li><img src="/static/home.svg" /><a href="/">หน้าหลัก</a></li>
                            <li><img src="/static/chart.svg" /><a href="/mainchart">ข้อมูลทางสถิติ</a></li>
                            <li><img src="/static/document.svg" /><a href="/maindoc">เบี้ยยังชีพผู้สูงอายุ</a></li>
                        </ul>
                        <ul className="non-sidebar-nav">
                            <div className="icon-sidebar">
                                <li><img src="/static/home.svg" /></li>
                                <p>HOME</p>
                            </div>
                            <div className="icon-sidebar">
                                <li><img src="/static/chart.svg" /></li>
                                <p>CHART</p>
                            </div>
                            <div className="icon-sidebar">
                                <li><img src="/static/document.svg" /></li>
                                <p>DOC</p>
                            </div>

                        </ul>
                    </div>
                    <div className={`wrapper${this.state.status ? " menuDisplayed" : ""}`}>
                        <nav>
                            <ul>
                                <div className="warp-manu">
                                    <li>
                                        <div className="box-hamberger">
                                            <a className={`hamberger btn${this.state.status ? " active" : " not-active"}`} onClick={this.toggle} >
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </a>
                                        </div>
                                    </li>

                                </div>
                            </ul>
                        </nav>
                    </div>

                    <div className="page-content-wrapper">
                        <div className="container-fluid">
                           
                             
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Main
