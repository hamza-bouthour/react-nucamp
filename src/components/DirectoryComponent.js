import React, { Component } from 'react';
import  CampsiteInfo from "./CampsiteInfoComponent";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from "reactstrap";



class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
           selectedCampsite: null, 
           selectedComments: null
        };
    }
    onCampsiteselect(campsite) {
        this.setState({selectedCampsite: campsite,
        selectedComments: campsite.comments})
        console.log(this.state);
    }
    // renderSelectedCampsite(campsite) {
    //     if(campsite) {
    //         return (
    //             <Card>
    //                 <CardImg top src={campsite.image} alt={campsite.name} />
    //                 <CardBody>
    //                     <CardTitle>{campsite.name}</CardTitle>
    //                     <CardText>{campsite.description}</CardText>
                        
    //                 </CardBody>
    //             </Card>
    //         )
    //     }
    //     return <div />;
    // }
    render() {
        const directory = this.props.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col-md-5 m-1 zeb">
                    <Card onClick={() => this.onCampsiteselect(campsite)}>
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>    
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
                <div>
                <CampsiteInfo campsite={this.state.selectedCampsite} comments={this.state.selectedComments}/>
                </div>
                

            </div>
        );
    }
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