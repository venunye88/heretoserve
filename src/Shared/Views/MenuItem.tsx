import React from "react";
import { MenuItemBase } from "sibaui";


export default class MenuItem extends MenuItemBase {
    render(){
        return(<li><a href={this.props.path}>{this.props.primaryText}</a></li>)
    }
}