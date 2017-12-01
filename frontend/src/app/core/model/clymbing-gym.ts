import {Address} from './address';

/**
 * Encapsulate a climbing gym
 */
export class ClymbingGym {
  /**
   * The name of the clymbing gym
   */
  private _name: string;

  /**
   * The address of the gym
   */
  private _address: Address;

  constructor(name: string, address: Address) {
    this._name = name;
    this._address = address;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }
}
