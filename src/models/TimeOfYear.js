export default class TimeOfYear {

  static seasons = {
    december: 'Winter',
    january: 'Winter',
    february: 'Winter',
    march: 'Spring',
    april: 'Spring',
    may: 'Spring',
    august: 'Summer',
    july: 'Summer',
    june: 'Summer',
    november: 'Autumn',
    october: 'Autumn',
    september: 'Autumn'
  };

  constructor(months: String[]) {
    this._value = this.calculateTimeOfYear(months);
  }

  _value: String;

  get value(): String {
    return this._value;
  }

  calculateTimeOfYear(months) {
    const uniqueMonths = [...new Set(months)];

    if (uniqueMonths.length === 1) {
      return uniqueMonths[0];
    }

    const matchingSeasons = [];

    uniqueMonths.forEach(month => {
      const season = TimeOfYear.seasons[month.toLowerCase()];
      if (matchingSeasons.indexOf(season) === -1) {
        matchingSeasons.push(season);
      }
    });

    return matchingSeasons.length === 1 ? matchingSeasons[0] : 'Few months';
  }
}