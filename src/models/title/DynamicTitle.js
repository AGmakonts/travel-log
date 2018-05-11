import TimeOfYear from '../TimeOfYear';
import Title from './Title';

export default class DynamicTitle extends Title {

  _countries: String[];
  _months: String[];

  /**
   *
   * @param countries
   * @param months
   */
  constructor(countries: String[], months: String[]) {
    super();
    this._countries = countries;
    this._months = months;
  }

  /**
   *
   * @return {*}
   */
  get value(): String {

    const uniqueCountries = [... new Set(this._countries)];
    const timeOfYear: TimeOfYear = new TimeOfYear(this._months);

    if (uniqueCountries.length === 1 && uniqueCountries[0] !== undefined) {
      return `${timeOfYear.value} in ${uniqueCountries[0]}`;
    } else if (uniqueCountries.length === 1) {
      return `Trip to somewhere in ${timeOfYear.value}`;
    }

    const maximumCountries: number = 4;
    const lastCountry: String = uniqueCountries.length > maximumCountries ? 'others' : uniqueCountries.pop();
    const suffix: String = (lastCountry ? `and ${lastCountry}` : '');
    const listedCountries: String = uniqueCountries.slice(0, maximumCountries).join(', ');

    return `${timeOfYear.value} in ${listedCountries} ${suffix}`;
  }
}