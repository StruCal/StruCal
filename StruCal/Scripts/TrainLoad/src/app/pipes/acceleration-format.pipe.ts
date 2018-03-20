import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accelerationFormat'
})
export class AccelerationFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    const inversion = Math.round(Math.pow(value, -1));
    const decimalPlaces = inversion.toString().length + 1;
    const multiplier = Math.pow(10, decimalPlaces);

    const newValue = Math.round(value * multiplier);
    return newValue;
  }

}
