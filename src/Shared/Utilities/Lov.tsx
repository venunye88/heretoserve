import React from "reactn";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import { FaAngleDown } from "react-icons/fa";
import { IService } from "sibaui/dist/Interfaces/IService";
import { IGridColumn } from "../Interfaces/IGridColumn";
import { NotiUtil } from "./NotiUtil";

export interface ILovProps {

    /**
     * @property the service that will provide the
     */
    service: IService;
    onSelect?: (item: any, fieldName: string) => void;
    code: string;
    name: string;
    customLovColumns?: IGridColumn[]; 
    title?:string;

    required?: boolean;

    /**
     * @property the name value of the input property
     */
    field: string;

    /**
     * function to be executed just before the modal is closed
     */
    onClose?: (item: any) => void
}

export class Lov extends React.Component<ILovProps, any> {

    constructor(props: ILovProps) {
        super(props);
    }

    

    async callLovModal(){

        //fetch lov data 
        if(this.props.service){

            this.setGlobal({
                lovModalOpen: true,
                lovModalTitle: this.props.title,
                lovModalOnClose: this.props.onClose,
                lovModalCustomGridColumns: this.props.customLovColumns || [],
                lovService: this.props.service,
                lovModalOnSelect: this.props.onSelect,
                lovData: [], //response.data
                lovField: this.props.field,
            });
            
            // var response = await this.props.service.getLov();

            // if(response.state) {
            //     //setup global values for lov modal
                

            // }else{
            //     NotiUtil.errorNoti(response.message);
            // }

        }else{
            NotiUtil.warningNoti(`Service not provided for this lov`)
        }

        
    }


    render(){
        return(<InputGroup>
                    <Input type="text" value={this.props.code} placeholder="Code" onChange={()=>{}} required={this.props.required} />
                    <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={this.callLovModal.bind(this)} title="Click to view list of values"><FaAngleDown/></Button>
                    </InputGroupAddon>
                    <Input type="text" value={this.props.name} placeholder="Name" onChange={()=>{}} />
                </InputGroup>)
    }

}