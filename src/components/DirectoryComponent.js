import React from 'react';
import { Loading } from './LoadingComponent';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { baseUrl } from '../shared/baseUrl';
function RenderDirectoryItem({campsite}) {
    return (
            <Link to={`/directory/${campsite.id}`}>
                <Card>
                <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardImgOverlay>
                        <CardTitle>{campsite.name}</CardTitle>
                    </CardImgOverlay>
                </Card> 
            </Link>
             
    )
}

function Directory(props)  {
  
    const directory = props.campsites.campsites.map(campsite => {
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} />
            </div>
        );
    });

    if (props.campsites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.campsites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

        return (
            <div className="container">
               <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
                <div className="row">
                    {directory}
                </div>
            
                

            </div>
        );
    
}

// class Asba extends Component {
//     constructor(props) { 
//         super(props);
//         this.state = {
//             number: 1
//         }
//     }
//     render() {
//         return (

//             <ExampleChildComponent moumrou={this.state.number} kilma="hedhihi kilmaton" />
//         )
        
//     }
// }

// class ExampleChildComponent extends Component {
//    render() {
//        return (
//            <div>{this.props.moumrou} {this.props.kilma}</div>
//        )
//    }
// }

export default Directory;