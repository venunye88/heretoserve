
import React, {PureComponent} from "react";
import { Card, CardHeader, CardBody } from "reactstrap";


export class FormCard extends PureComponent<any, any> {
    constructor(props: any){
        super(props);
    }
    
    render(){
        return(
            <Card>
                <CardHeader>
                    <b>{this.props.title}</b> 
                    Form
                </CardHeader>
                <CardBody>
                    {this.props.children}
                </CardBody>
            </Card>
        )
    }
}