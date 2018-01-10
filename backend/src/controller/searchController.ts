/**
 * chumm-uff
 **/
import {Request, Response} from 'express';
import {BaseController} from './baseController';
import {ISearchMeetupsRequest, LocationType, Meetup, MeetupsFactory, SearchDto} from '@chumm-uffa/interface';
import {DBMeetup, MeetupPopulate} from '../models/meetup/model';

export class SearchController extends BaseController {

    /**
     * dummy Implementation, get all Meetups
     * @param {Request} req
     * @param {Response} res
     */
    public searchMeetupsTest(req: Request, res: Response) {
        // Find all meetups
        DBMeetup.find({}).populate(MeetupPopulate).then((dbMeetups) => {
            let meetups: Meetup[] = [];
            for (let dbMeetup of dbMeetups) {
                meetups.push(dbMeetup.toInterface());
            }
            res.json(MeetupsFactory.createSearchMeetupResponse(true, '', meetups));
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createSearchMeetupResponse(false, err.toString()));
            return;
        });
    }

    /**
     * Implementation, get all Meetups by searchDto
     * @param {Request} req
     * @param {Response} res
     */
    public searchMeetups(req: Request, res: Response) {

        const searchRequest: ISearchMeetupsRequest = req.body;

        // from, to and activity must be present
        if (!searchRequest.searchDto ||
            !searchRequest.searchDto.fromDateTime ||
            !searchRequest.searchDto.toDateTime) {
            res.status(400);
            res.json(MeetupsFactory.createSearchMeetupResponse(false, 'wrong input.'));
            return;
        }
        const searchDto = searchRequest.searchDto;

        let zr = DBMeetup.find({'from': {'$gte': searchDto.fromDateTime}, 'to': {'$lte': searchDto.toDateTime}});
        if (searchDto.locationType === LocationType.INDOOR && searchDto.indoor) {
            zr = zr.find({indoor: searchDto.indoor});
        }
        if (searchDto.locationType === LocationType.OUTDOOR && searchDto.outdoor) {
            zr = zr.find({outdoor: new RegExp(searchDto.outdoor, 'i')})
        }
        zr.populate(MeetupPopulate).then((dbMeetups) => {
            let meetups: Meetup[] = [];
            meetups = dbMeetups.map(dbmu => dbmu.toInterface()).filter(this.getPersonFilter(searchDto));
            res.json(MeetupsFactory.createSearchMeetupResponse(true, '', meetups));
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(MeetupsFactory.createSearchMeetupResponse(false, err.toString()));
            return;
        });
    }

    private getPersonFilter(searchDto: SearchDto) {
        return (meetup) => {

            if (searchDto.sex && searchDto.sex !== meetup.owner.sex) {
                return false;
            }
            const ownerWeight: number = this.getWeight(meetup.owner.weight);
            if (ownerWeight) {
                if (searchDto.weightMin && searchDto.weightMin > ownerWeight) {
                    return false;
                }
                if (searchDto.weightMax && searchDto.weightMax < ownerWeight) {
                    return false;
                }
            }
            return true;
        }
    }

    private getWeight(weigth: string): number {
        let result = null;
        if (weigth) {
            result = Number(weigth);
            return isNaN(result) ? null : result;
        }
        return result;
    }


    // ObjectId("5a49fc4ebb17414224c7e8a0")


    // DBMeetup.find({indoor: indoorId});
    // DBMeetup.find({"from": {"$gte": begin, "$lte": end}})


    // Find all meetups
    // DBMeetup.where('from').gte(begin.getTime()).where('to').lte(end.getTime())
    // DBMeetup.find({"from": {"$gte": begin}, "to": {"$lte": end}})
    // DBMeetup.find({indoor: indoorId})
    // DBMeetup.find({outdoor: /outDoo/i})
    // DBMeetup.find().where({outdoor: new RegExp(outdoorText, 'i')})

    /*Queries
    * Zeit:
    *  var1  :   DBMeetup.where('from').gte(begin.getTime()).where('to').lte(end.getTime())
       var2  :  DBMeetup.find({"from": {"$gte": begin}, "to": {"$lte": end}})



       Indoor:
       DBMeetup.find({indoor: indoorId})

       Outdoor:
       DBMeetup.find({outdoor: new RegExp(outdoorText, 'i')})
       DBMeetup.find().where({outdoor: new RegExp(outdoorText, 'i')})


       Query für die Owner Daten geht nicht, da Mongo DB nicht joinen kann.
       Wir müssten das Datenmodel anders aufbauen
    *
    * */


}