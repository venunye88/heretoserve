import React from "reactn";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { DefaultGrid } from "./GridUtil";
import { GlobalState } from "../../App/GlobalState";


export class SearchModal extends React.Component{


    toggle(){
        this.setGlobal({
            searchShow: !this.global.searchShow,
            searchColumns: this.global.searchShow ? this.global.searchColumns : [],
            searchResultItems: this.global.searchShow ? this.global.searchResultItems : [],
            searchTitle: this.global.searchShow ? this.global.searchTitle : "",
        } as GlobalState);
    }

    onSelect(index: number, item: any) {
        this.global.searchSelect(item, index);
    }

    render(){
        var global: GlobalState = this.global as any;
        return (
            <>
                <Modal 
                    isOpen={global.searchShow} 
                    toggle={this.toggle.bind(this)}
                    centered>
                    <ModalHeader 
                        className="bg-primary"
                        toggle={this.toggle.bind(this)}>
                        { global.searchTitle || "Search results" }
                    </ModalHeader>
                    <ModalBody>

                        {/* lov grid */}
                        <DefaultGrid
                            rows={ global.searchResultItems}
                            columns={global.searchColumns}
                            onRowClick={this.onSelect.bind(this)}
                            height={350} />
                            
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle.bind(this)}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </>);
    }
}