
import { toast } from "react-toastify";


export class NotiUtil {

    public static successNoti(message: any){
        toast.success(message);
    }

    public static errorNoti(message: any){
        toast.error(message);
    }

    public static infoNoti(message: any){
        toast.info(message);
    }

    public static warningNoti(message: string){
        toast.warn(message);
    }

}