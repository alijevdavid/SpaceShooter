import { FormControl } from "@angular/forms";

export class ValidationService{
    noSpaceAllowed(control : FormControl){
        if(control.value != null && control.value.indexOf(' ') != -1){
            return {noSpaceAllowed : true}
          }
          return null;
    }
}
