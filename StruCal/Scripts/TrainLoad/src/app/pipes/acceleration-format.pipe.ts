import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accelerationFormat'
})
export class AccelerationFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    return value * 10000;
  }

}
