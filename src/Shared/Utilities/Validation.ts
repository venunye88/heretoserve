import { DateTime } from "sibaui";


export interface IValidationResult {
    state: boolean;
    message: string;
}

export class Validation {

    /**
     * Method to validate a single or multiple forms
     * @param form the string id of a single form or an array of string ids for multiple forms
     */
    static formValidation (form: string[]|string):boolean {
        
        let valid: boolean = true;

        if(Array.isArray(form)) {
            for (let i in form) {
                if(!form[i]) { continue; }

                // tslint:disable-next-line:typedef
                $(form[i]).find("input,select,textarea").each(function() {
                    if((Validation.fieldCheck(this))) {
                        // mark the field green
                        Validation.validHiglight(this);
                    } else {
                        // mark the field red
                        Validation.inValidHiglight(this);
                        valid = false;
                    }

                });
            }
        } else if (typeof form === "string") {
            // tslint:disable-next-line:typedef
            $(form).find("input, select, textarea").each(function() {

                if ((Validation.fieldCheck(this))) {
                    // mark the field green
                    Validation.validHiglight(this);
                } else {
                    // mark the field red
                    Validation.inValidHiglight(this);
                    valid = false;
                }
            });
        }

        return valid;
    }

    static validHiglight(field: any): void {
        $(field).css({"border color":"green"});

        $(field).addClass("validated");
        $(field).addClass("is-valid");
        $(field).removeClass("is-invalid");
        $(field).removeClass("not-validated");

    }

    static inValidHiglight(field: any): void {
        $(field).css({"border color":"red"});
        $(field).addClass("validated");
        $(field).addClass("is-invalid");
        $(field).removeClass("is-valid");
        $(field).removeClass("not-validated");
    }

    static fieldCheck(field: any): boolean {
        // we need to check if the field is required
        // if the field is required then we will need to check if the field is
        // 1. not empty
        // 2. the value enterd is valid from the type of form control
        // alert($(field).attr("required"));
        if ($(field).prop("required")) {
           // alert(this.fieldEmpty(field))
            if (this.fieldEmpty(field)) { return false; }
            if (!this.fieldEmpty(field)) { return true; }
            if ($(field).hasClass("in-valid")) { return false ; }
        } else {
            // if the field is not required then we only need to check if
            // 1. the value entered for the field is valid
            if (!Validation.fieldEmpty(field)) {
                if ($(field).hasClass("in-valid")) { return false; }
            }
        }

        return true;
    }



    static fieldEmpty(field: any): boolean {
        return Validation.isEmpty($(field).val());
    }

    static inputValidation(value: any, state: any): IValidationResult {
        // check if the field is empty
        if (state.required && this.isEmpty(value)) {
            return { state: false, message: "This field is required" } as IValidationResult;
        }

        switch (state.type) {
        case "text":
            // check if the max length value has been exceeded
            return this.checkLength(value, state.minLength, state.maxLength);
        case "number":
            // check if the value is a valid number
                if (this.isInt(value)) {
                    // check if the minNumber value hase been exceeded
                    return this.checkNumber(value, state.minNumber, state.maxNumber);
                }
                return {state: false, message: "The value entered is not a number"} as IValidationResult;

        case "tel":
            // check if the max length value has been exceeded
            if (this.isInt(value)) {
                // check if the minNumber value hase been exceeded
                return this.checkNumber(value, state.minNumber, state.maxNumber);
            }
                return this.checkLength(value, state.minLength, state.maxLength);
        case "email":
            // check if the value is a valid email
                if (!this.checkEmail(value).state) {
                    return this.checkEmail(value);
                }

            // check if the max length value has been exceeded
                return this.checkLength(value, state.minLength, state.maxLength);
        case "password":
            // check if the max length value has been exceeded
                return this.checkLength(value, state.minLength, state.maxLength);
        case "date":
            // check if the max length value has been exceeded
                return this.isValidDate(value);
        default:
            return { state: false, message: "Invalid Form Control type" } as IValidationResult;
        }
    }

    static checkLength(value: string, minLength: number, maxLength: number): IValidationResult {
        if (value.length >= minLength) {
            if (value.length <= maxLength) {
                return { state: true, message: `Valid` } as IValidationResult;
            }
            return { state: false, message: `Max Characters ${maxLength} : Entered ${value.length}` } as IValidationResult;
        }
        return { state: false, message: `Min Characters ${minLength} : Entered ${value.length}` } as IValidationResult;
    }

    static checkNumber(value: number, minNumber: number, maxNumber: number): IValidationResult {
        if (value >= minNumber) {
            if (value <= maxNumber) {
                return { state: true, message: `Valid` } as IValidationResult;
            }
            return { state: false, message: `Max Characters ${maxNumber} : Entered ${value}` } as IValidationResult;
        }
        return { state: false, message: `Min Number ${minNumber} : Entered ${value}` } as IValidationResult;
    }

    static isValidDate(date: any): IValidationResult {
        if (DateTime.isValid(date)) {
             return { state: true, message: `Valid` } as IValidationResult;
        }
        return { state: false, message: `Invalid date ${date}` } as IValidationResult;
    }

    static isInt(value: any): boolean {
        var x: any;
        // return  value.valueOf();
       return typeof value ==="number";
        // return isNaN(value);
        // return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
    }

    static checkEmail(value: string): IValidationResult {
        // tslint:disable-next-line:max-line-length
        const re:RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(value)) {
            return { state: true, message: `Valid` } as IValidationResult;
        }
        return { state: false, message: `Invalid Email Address` } as IValidationResult;
    }

    static percentCheck(value: number): IValidationResult {
        if (value <= 100) {
            return { state: true, message: `Valid` } as IValidationResult;
        }
        return { state: false, message: `Amount entered exceeds 100%` } as IValidationResult;
    }

    static setValidState(field: any): any {
        $(field).css({"border-color":"green"})
        $(field).removeClass("field-error");
        $(field).addClass("field-valid");
    }

    static setInvalidState(field: any): any {
        $(field).css({"border-color":"red"})
        $(field).removeClass("field-valid");
        $(field).addClass("field-error");
    }


    static clearValidation(form: any){
        $(form).find("input,select,textarea")
        .removeClass("is-valid")
        .removeClass("is-invalid")
        .removeClass("validated")
        .addClass("not-validated")
        .each(function(){
            $(this).val("");
        })
    }

    



    static isEmpty(val:any):boolean {
        return /^\s*$/.test(val);
    }

    static contains(string: string, substring: string):number {
        // tslint:disable-next-line:no-bitwise
        return ~string.indexOf(substring);
    }

    static noSpace(txt: string): string {
        while (txt.match(/\s/) != null) { txt = txt.replace(/\s/, ""); }
        return txt;
    }

    static percentFieldValidation(field: any): void {
        $(field).on("blur", () => {
            if (parseFloat($(this).val() as any) > 100) {
                // u.growl_warning("Percentage value cannot be more than 100");
                $(this).val("");
            }
        });
    }
}