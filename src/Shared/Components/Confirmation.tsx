import reactn from "reactn";
import { GlobalState } from "../../App/GlobalState";

export class Confirmation {

    static call(message: string, action: (e: any) => void){
        reactn.setGlobal({
            confirmOpen: true,
            confirmAction: action,
            confirmMessage: message
        } as GlobalState);
    }

}