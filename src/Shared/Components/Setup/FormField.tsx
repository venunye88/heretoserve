import React from "reactn";


export default class FormField extends React.PureComponent{

    render(){
        return(
        <div style={{ border: "1px solid red", padding:".5em", marginBottom:"1em", borderRadius:"4px" }}>
            {this.props.children}
        </div>)
    }
}