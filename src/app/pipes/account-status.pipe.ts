import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'accountStatusDisplayPipe'
})

export class AccountStatusDisplayPipe implements PipeTransform {
    transform(status: any) {
        let results = "";
        switch (status) {
            case 0:
                    results = `ACTIVE`
                break;
            case 1:
                results = `LOCKED`
                break;
            default:
                results = "ERROR!!!";
        }
        return results;
    }

}