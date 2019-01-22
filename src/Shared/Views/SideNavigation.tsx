import React from "react";
import { SideNavigationBase } from "sibaui";
import MenuItem from "./MenuItem";

export default class SideNavigation extends SideNavigationBase {

    render(){
        return(
        <div style={{ width:"15%" }}>
            <ul>
                {this.GenerateMenu(MenuItem)}
            </ul>
        </div>)
    }
} 