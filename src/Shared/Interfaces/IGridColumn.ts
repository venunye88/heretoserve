import { IGridColumnBase } from "sibaui/dist/Interfaces/IGridColumnBase";

export interface IGridColumn extends IGridColumnBase{
    key: string,
    name: string,
    filterable?: boolean,
    resizable?: boolean,
    sortable?: boolean,
    draggable?: boolean,
    visible: boolean;
    width?: number;
}