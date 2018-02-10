export class Hall {

  private _key: string;
  private _name: string;

  constructor(key: string, name: string) {
    this._key = key;
    this._name = name;
  }

  public toJSON() {
    return {
      key: this.key,
      name: this.name
    };
  }

  public static fromJSON(json: any) {
    return new Hall (
      json.key,
      json.name
    );
  }

  public static fromJSONArray(json: any[]) {
    const halls: Hall[] = [];
      json.map( (hall) => {
        halls.push(Hall.fromJSON(hall));
    });
    return halls;
  }

  get key(): string {
    return this._key;
  }

  get name(): string {
    return this._name;
  }
}
