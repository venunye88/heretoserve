
import React from "reactn";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { GlobalState } from "../../App/GlobalState";


export default class ConfirmationModal extends React.Component<any, any>{

    toggle(){
        this.setGlobal(
            {
                confirmOpen: !this.global.confirmOpen,
                confirmMessage: this.global.confirmOpen ? this.global.confirmMessage: "",
                confirmAction: this.global.confirmOpen ? this.global.confirmAction: () => {}
            } as GlobalState);
    }

    onOk(){
        const action = this.global.confirmAction || (() => {})

        this.toggle();
        action();
    }

    render(){
        var global: GlobalState = this.global as any;

        return (
            <>
                <Modal 
                    isOpen={global.confirmOpen} 
                    toggle={this.toggle.bind(this)}
                    centered>
                    <ModalHeader 
                        className="bg-primary" 
                        toggle={this.toggle.bind(this)}>
                        Confirm your action!
                    </ModalHeader>
                    <ModalBody>
                        {/* confirmation message */}
                        {global.confirmMessage}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onOk.bind(this)}>Ok</Button>{' '}
                        <Button color="danger" onClick={this.toggle.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>);
    }

}
