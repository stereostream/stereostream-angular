import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pairs', pure: true
})
export class PairsPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    return value
      .filter((v, i) => i % 2 === 0)
      .map((v, i) => [value[i * 2], value[i * 2 + 1]]);
  }
}
