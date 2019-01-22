
import { LayoutBase } from "sibaui";
import { ILayoutConfig } from "sibaui/dist/Interfaces/ILayoutConfig";
import  LandingMainContent  from "./Views/LoginMainContent";


export default class LoginLayout extends LayoutBase {
 
    constructor(props: any){
        super(props,{
            name: "login",
            title:"Landing", 
            menuList: [],
            menuTitle:"",
            mainContent: LandingMainContent,
            
        } as ILayoutConfig)
    }
}