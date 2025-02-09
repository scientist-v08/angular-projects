import { Pipe, PipeTransform } from '@angular/core';
import { timezoneCurrencyMap } from './currency-transform-data';

@Pipe({
  name: 'currencyTransform',
  standalone: true,
  pure: true,
})
export class CurrencyTransform implements PipeTransform {
  transform(value: string | number): string {
    const numericValue =
      typeof value === 'string'
        ? Number(Number(value).toFixed(2))
        : Number(value.toFixed(2));

    // Handle cases where the conversion results in NaN
    if (
      isNaN(numericValue) ||
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return 'NA'; // Return 'NA' or any default value for invalid or missing input
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezoneCurrencyMap[timezone].format === '##,##,###.00') {
      return this.formatIndianNumberingSystem(numericValue, timezone);
    } else {
      return this.formatWesternNumberingSystem(numericValue, timezone);
    }
  }

  private formatIndianNumberingSystem(value: number, timezone: string): string {
    const valueStr = value.toFixed(2);
    const [whole, fraction] = valueStr.split('.');

    const lastThree = whole.slice(-3);
    const otherNumbers = whole.slice(0, -3);
    const formattedWhole =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
      (otherNumbers ? ',' : '') +
      lastThree;
    const symbol = timezoneCurrencyMap[timezone].symbol;

    return `${symbol}${formattedWhole}.${fraction}`;
  }

  private formatWesternNumberingSystem(
    value: number,
    timezone: string
  ): string {
    const valueStr = value.toFixed(2);
    const [whole, fraction] = valueStr.split('.');

    const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const symbol = timezoneCurrencyMap[timezone].symbol;
    return `${symbol}${formattedWhole}.${fraction}`;
  }
}
