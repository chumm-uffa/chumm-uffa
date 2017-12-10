import {Hall} from '../core/model/hall';
import {Meetup} from '../core/model/meetup';

export class Util {

  static resolveLocation(meetup: Meetup, halls: Hall[]): string {

    if (meetup.outdoor) {
      return meetup.outdoor;
    } else {
      const result = halls.find(hall => hall.key === meetup.indoor);
      return result ? result.name : meetup.indoor;
    }
  }
}
