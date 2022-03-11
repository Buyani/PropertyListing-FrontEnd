import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'statusDisplayPipe'
})

export class StatusPipe implements PipeTransform {
    transform(status: any) {
        let results = "";
        switch (status) {
            case 0:
                    results = `HIDEN`
                break;
            case 1:
                results = `LIVE`
                break;
            case 2:

                results = `DELETED`;
                break;
            default:
                results = "ERROR!!!";
        }
        return results;
    }

}