
export class Validation {

  public static getInvalidObject(name: string): { [key: string]: any } {
    const object = {};
    object[name] = {valid: false};
    return object;
  }
}
