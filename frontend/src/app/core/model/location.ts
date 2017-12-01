/**
 * Encapsulate a geo location
 * See https://www.latlong.net/
 */
export class Location {
  /**
   * Latitude coordinate
   */
  private _lat: string;

  /**
   * Longitude coordinate
   */
  private _lng: string;

  constructor(lat: string, lng: string) {
    this._lat = lat;
    this._lng = lng;
  }

  get lat(): string {
    return this._lat;
  }

  set lat(value: string) {
    this._lat = value;
  }

  get lng(): string {
    return this._lng;
  }

  set lng(value: string) {
    this._lng = value;
  }
}
