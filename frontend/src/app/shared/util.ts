import {Meetup, Hall} from '@chumm-uffa/interface';

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
