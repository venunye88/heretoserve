import React from "react";
import { Container, Col } from "reactstrap";
import { MainContentBase, TokenManager, AppConfigStore } from "sibaui";
import { FiUser, FiUnlock } from "react-icons/fi";


export default class LoginMainContent extends MainContentBase {


    constructor(props: any){
        super(props);
        
        this.state = {
        };

    }
 

    onChange(e: any){
        this.setState({
            ...this.state, ...{ [e.target.name]: e.target.value }
        })
    }

    render():JSX.Element {

        return (
        <>
            <Container className="align-items-center" style={{height:"100vh"}}>
                
                <div className="row justify-content-center align-items-center" style={{height:"100vh"}}>
                    <div className="col-md-12">
                     <h2 className="text-primary text-center">Here To Serve App</h2>
                    </div>
                </div>
            </Container>
            
        </>);
    }
}