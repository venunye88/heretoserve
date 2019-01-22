import React from "reactn";
import { Card, CardHeader, Button, InputGroup, Input, InputGroupAddon, CardBody, Row, Col, Form, FormGroup, Label, CardFooter } from "reactstrap";
import { FaSave } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { MdSearch } from "react-icons/md";

export interface ISetupCardProps{
    onSave?: (e: any) => void;
    onReset?: (e: any) => void;
    onSearch?: (e: any) => void;
    onSearchQueryChange?: (e: any) => void;

    /**
     * @property collection of buttons that you want to display on the card header section
     */
    customActionButtons?: JSX.Element[]

    searchQuery?: string;
}

export default class SetupCard extends React.Component<ISetupCardProps,any>{

    render(){
        return(<Card>
            <CardHeader style={{display: "flex", justifyContent:"space-between", flexWrap:"wrap-reverse"}}>
                <div>
                    {this.props.onSave? <Button color="success" onClick={this.props.onSave} title="Click to save the changes that you have made in the setup below"> <FaSave size="18px"/>  Save </Button> : null}{' '}
                    {this.props.onReset? <Button color="primary" onClick={this.props.onReset} title="Click to clear all data in the setup below"> <IoMdRefresh size="18px"/> Reset </Button> : null}{' '}
                </div> 
                <div>
                    {this.props.customActionButtons}
                </div>
                <div>
                    {this.props.onSearch ? 
                    <InputGroup>
                        <Input type="text" placeholder="Enter code or name" title="Enter code or name to search" onChange={this.props.onSearchQueryChange} value={this.props.searchQuery} />
                        <InputGroupAddon addonType="append">
                            <Button onClick={this.props.onSearch} color="primary" title="Click to search"><MdSearch size="18px"/></Button>
                        </InputGroupAddon>
                    </InputGroup> : null}
                    
                </div>
                
            </CardHeader>
            <CardBody>
                {this.props.children}
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>);
    }
}