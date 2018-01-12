/**
 * chumm-uff
 **/
import {Request, Response} from 'express';
import {BaseController} from './baseController';
import {ISearchMeetupsRequest, LocationType, Meetup, MeetupsFactory, SearchDto} from '@chumm-uffa/interface';
import {DBMeetup, MeetupPopulate} from '../models/meetup/model';

export class SearchController extends BaseController {

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
            // todo warten bis Umbau von Promisen gefixt
            res.status(500);
            res.json(MeetupsFactory.createSearchMeetupResponse(false, 'Suche bis fix promises ausser Betrieb!'));

            // meetups = dbMeetups.map(dbmu => dbmu.toInterface()).filter(this.getPersonFilter(searchDto));
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
}