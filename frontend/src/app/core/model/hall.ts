export class Hall {

  private _key: number;
  private _name: string;

  constructor(key: number, name: string) {
    this._key = key;
    this._name = name;
  }

  get key(): number {
    return this._key;
  }

  get name(): string {
    return this._name;
  }
}
