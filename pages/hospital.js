import React from 'react'
import Link from 'next/link'
import Sheetapi from '../config/api'
import Sidebar from '../components/layout/sidebar';
import dynamic from 'next/dynamic'

const Barchart = dynamic(
    () => import('../components/chart/barchart'),
    { ssr: false }
)

class Hospital extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [{ name: "Main", link: "/main" },
            { name: "Dashboard", link: "/mainchart" },
            { name: "Service", link: "/service" },
            { name: "Hospital", link: "/hospital" },
            { name: "Help", link: "/help" },
            ],
            status: true
        }
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

    async componentDidMount() {
        await localStorage.setItem("myOauth", JSON.stringify(await Sheetapi.postSheetValues()))

    }

    render() {

        return (
            <div className="warp-main">
                <div className={`wrapper${this.state.status ? " menuDisplayed" : ""}`}>
                    <Sidebar />
                    <div className={`wrapper${this.state.status ? " menuDisplayed" : ""}`}>
                        <nav className="main">
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
                            <div className="nav-bar-main">
                                <ul>
                                    <div className="nav-bar-main">
                                        {
                                            this.state.list.map((item, index) => {
                                                return (
                                                    <Link href={item.link}>
                                                        <li key={index}>
                                                            <p>{item.name}</p>
                                                        </li>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>

                                </ul>
                            </div>
                        </nav>
                    </div>

                    <div className="page-content-wrapper">
                        <div className="container-fluid">
                            <h1 className="text-center">โรงพยาบาลเเละการดูแลรักษา</h1>
                            <h2 className="small text-center"></h2>

                            <div className="warp-chart">
                                <div className="chart-contents">
                                    <Barchart />
                                </div>
                                {/* <div className="chart-contents">
                                  
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Hospital;