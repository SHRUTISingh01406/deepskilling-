import { Pipe, PipeTransform } from '@angular/core';

// Pipes are pure by default (only re-run when the input reference changes).
// If a pipe needs to re-run on mutable data changes, set pure: false in @Pipe, but use sparingly for performance.
@Pipe({
  name: 'creditLabel',
  standalone: true
})
export class CreditLabelPipe implements PipeTransform {
  transform(credits: number | null | undefined): string {
    if (credits === null || credits === undefined || credits === 0) {
      return 'No Credits';
    }
    if (credits === 1) {
      return '1 Credit';
    }
    return `${credits} Credits`;
  }
}
