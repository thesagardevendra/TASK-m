import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
 name: 'extractInitials'
})
export class ExtractInitialsPipe implements PipeTransform {
 transform(name: string): string {
   const initials = name.split(' ')
     .map(word => word.charAt(0))
     .join('')
     .toUpperCase();
   return initials.substring(0, 2);
 }
}