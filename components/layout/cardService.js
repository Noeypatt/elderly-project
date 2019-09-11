import React from 'react'
import Link from 'next/link'

class CardService extends React.Component {

    static defaultProps = {
        card: []
    }


    render() {
        return (
            <React.Fragment>
                {
                    this.props.card.map((item, index) => {
                        return (
                            // <div class="card" >
                            //     <div class="card-header">
                            //         <h6>{item.featured}</h6>
                            //     </div>
                            //     <ul class="list-group list-group-flush">
                            //         <Link href="/">
                            //             <li class="list-group-item"><p>{item.head}</p></li>
                            //         </Link>
                            //         {
                            //             !!item.head2 ?
                            //                 <Link href="/">
                            //                     <li class="list-group-item"><p>{item.head2}</p></li>
                            //                 </Link>
                            //                 :
                            //                 null
                            //         }


                            //     </ul>
                            // </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{item.title}</h5>
                                    <p class="card-text">{item.text}</p>
                                    <a href={item.link} class="btn btn-primary"><h6>Go somewhere</h6></a>
                                </div>
                            </div>
                        )
                    })
                }
            </React.Fragment>

        )
    }
}
export default CardService;