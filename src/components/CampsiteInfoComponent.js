import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Modal, Button, ModalHeader, ModalBody, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    onSubmit(values) {  
        console.log(values)
        //     for (const [key, value] of Object.entries(values)) {
        //     console.log(`${key}: ${value}`);
        //     alert(`${key}: ${value}`);
        // }  
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);

    }
    render() {
        return (
            <div>         
                <div>
                    <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"></i> Submit Comment</Button>
                </div>
                <div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Feedback</ModalHeader>
                        <ModalBody>    
                            <LocalForm onSubmit={values => this.onSubmit(values)}>
                                    <div className="form-group">
                                        <Label htmlFor="rating">Rating</Label>                                  
                                            <Control.select id="rating" 
                                            model=".rating" 
                                            name="rating"
                                            className="form-control" value="5"> 
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5" selected="selected">5</option>
                                            </Control.select>  
                                    </div>  
                                    <div className="form-group">  
                                        <Label  htmlfor="author">Your name</Label>
                                        <Control.text id="author"
                                        model=".author"
                                        name="author"
                                        placeholder="Your name" 
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}>
                                        </Control.text>
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'field required',
                                                minLength: 'minimum 2 caracters',
                                                maxLength: 'maximum 15 caracters' 
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="text">Your feedback</Label>
                                            <Control.textarea id="text" 
                                            model=".text"
                                            name="text" 
                                            rows={6} 
                                            className="form-control" 
                                            placeholder="Your text here">
                                            </Control.textarea>
                                    </div>
                                    <div>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </div>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </div>  
        )
    }
} 
function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
            <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                    
                </CardBody>
            </Card>
            </FadeTransform>
        </div>
    )
}
function RenderComment({comments, postComment, campsiteId}) {
    if (comments) {

            return (     
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    <Stagger in>
                {
                    comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                            <div>
                                <p>{comment.text}</p>
                                <p>--{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>   
                            </Fade>           
                        )
                    })
                }
                </Stagger>  
                    <CommentForm campsiteId={campsiteId} postComment={postComment} />
                </div> 
            )};
    return <div />
    
}
function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
                <div className="row">
                
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComment
                      comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}                       
                    />
                </div>
            </div>
           
        )
    }
    return <div />;
}



   
        
    





export default CampsiteInfo;