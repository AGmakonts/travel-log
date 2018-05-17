import csv from 'csvtojson';
import 'whatwg-fetch'
import receiveAirports from './receiveAirports';
import {requestAirports} from './requestAirports';

export default function fetchAirports() {

  return dispatch => {

    dispatch(requestAirports());

    fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat')
      .then(response => {return response.text()})
      .then(response => {

        csv(
          {
            noheader: true,
            headers: [
              'id',
              'name',
              'city',
              'country',
              'IATA',
              'ICAO',
              'lat',
              'lng',
              'alt',
              'tz',
              'dts',
              'type',
              'source'
            ]
          }
        )
          .fromString(response)
          .on('error', console.log)
          .on('end_parsed', (json) => {
            dispatch(receiveAirports(json));
          });

      })

  }

}


/*

Airport ID	Unique OpenFlights identifier for this airport.
Name	Name of airport. May or may not contain the City name.
City	Main city served by airport. May be spelled differently from Name.
Country	Country or territory where airport is located. See countries.dat to cross-reference to ISO 3166-1 codes.
IATA	3-letter IATA code. Null if not assigned/unknown.
ICAO	4-letter ICAO code.
Null if not assigned.
Latitude	Decimal degrees, usually to six significant digits. Negative is South, positive is North.
Longitude	Decimal degrees, usually to six significant digits. Negative is West, positive is East.
Altitude	In feet.
Timezone	Hours offset from UTC. Fractional hours are expressed as decimals, eg. India is 5.5.
DST	Daylight savings time. One of E (Europe), A (US/Canada), S (South America), O (Australia), Z (New Zealand), N (None) or U (Unknown). See also: Help: Time
Tz database time zone	Timezone in "tz" (Olson) format, eg. "America/Los_Angeles".
Type	Type of the airport. Value "airport" for air terminals, "station" for train stations, "port" for ferry terminals and "unknown" if not known. In airports.csv, only type=airport is included.
Source	Source of this data. "OurAirports" for data sourced from OurAirports, "Legacy" for old data not matched to OurAirports (mostly DAFIF), "User" for unverified user contributions. In airports.csv, only source=OurAirports is included.

 */