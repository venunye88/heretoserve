import r from "reactn";
import { IGridColumn } from "../Interfaces/IGridColumn";
import { GlobalState } from "../../App/GlobalState";


export class Search{

    static call(title: string, searchColumns: IGridColumn[], searchData: any[], searchSelect: (item: any, index: number) => void){
        r.setGlobal({
            searchColumns: searchColumns,
            searchTitle: title,
            searchResultItems: searchData,
            searchSelect,
            searchShow: true
        } as GlobalState)
    }
}