import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'typeDisplayPipe'
})

export class TypePipe implements PipeTransform {
    transform(status: any) {
        let results = "";
        switch (status) {
            case 0:
                    results = ``
                break;
            case 1:
                results = `FEATURED`
                break;
            default:
                results = "ERROR!!!";
        }
        return results;
    }

}