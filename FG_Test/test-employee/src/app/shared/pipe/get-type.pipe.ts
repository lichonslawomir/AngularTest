import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getType'
})
export class GetTypePipe implements PipeTransform {
  transform(value: any): string {
    return typeof value;
  }
}
