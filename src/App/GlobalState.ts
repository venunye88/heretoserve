
import { IGlobalState } from "sibaui/dist/Interfaces/IGlobalState";
import { IGridColumn } from "../Shared/Interfaces/IGridColumn";

export class GlobalState  implements IGlobalState  {

    public id!: string;
    /**
     * notification global props
     */
    public notiOpen!: boolean;
    public notiMessage!: string;
    public notiAction!: Function;
    public notiType!: number


    /**
     * confirmation global props
     */
    public confirmOpen!: boolean;
    public confirmMessage!: string;
    public confirmAction!: (e: any) => void;


    /**
     * search global props
     */
    public searchShow!: boolean;
    public searchResultItems!: any[];
    public searchColumns!: IGridColumn[];
    public searchTitle!: string | null;
    public searchSelect!: (item: any, index: number) => void;




    /**
     * Side navigation global props
     */
    public sideNavOpen!: boolean;


    public static init(): GlobalState{
        return {
            id: "heretoserve",
            notiAction: () => {},
            notiMessage:"",
            notiOpen: false,
            notiType: 3,
            confirmAction: () => {},
            confirmMessage: "",
            confirmOpen: false,
            searchResultItems: [],
            searchShow: false,
            searchColumns: [],
            searchSelect: () => {},
            searchTitle: null,
            sideNavOpen: true,
            
         } as GlobalState
    }

    
}