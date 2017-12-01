/**
 * Encapsulate an address
 */
export class Address {

  /**
   * The street
   */
  private _street: string;

  /**
   * The number of the street
   */
  private _streetNumber: string;

  /**
   * The postal code
   */
  private _postalCode: string;

  /**
   * The town
   */
  private _town: string;

  /**
   * The province. Better known as "Kanton"
   */
  private _province: string;

  /**
   * The country
   */
  private _country: string;

  constructor(street: string = '',
              streetNumber: string = '',
              postalCode: string = '',
              town: string = '',
              province: string = '',
              country: string = '') {
    this._street = street;
    this._streetNumber = streetNumber;
    this._postalCode = postalCode;
    this._town = town;
    this._province = province;
    this._country = country;
  }

  get street(): string {
    return this._street;
  }

  get streetNumber(): string {
    return this._streetNumber;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  get town(): string {
    return this._town;
  }

  get province(): string {
    return this._province;
  }

  get country(): string {
    return this._country;
  }
}
