import React from "react";
import { MainContentBase } from "sibaui";

export default class SharedMainContent extends MainContentBase {
    
    constructor(props: any){
        super(props);
    }

    render(){ 
        return(
        <>
            <div id="maincontent-container">
                {this.RenderRoutes(this.props.routes)}
            </div>
        </>);
    }
}