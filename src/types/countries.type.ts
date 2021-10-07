export interface Country {
  countryregion: string
  lastupdate: string
  location: Location
  countrycode: Countrycode
  confirmed: number
  deaths: number
  recovered: number
}

export interface Location {
  lat: number
  lng: number
}

export interface Countrycode {
  iso2: string
  iso3: string
}
