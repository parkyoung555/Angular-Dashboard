import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args || !args.trim()) {
      return value;
    }
    return value.replace(new RegExp(args, 'gi'), '<mark>$&</mark>');
  }

}
