/**
 * chumm-uff
 **/
import {Request, Response} from 'express';
import {BaseController} from './baseController';
import {ISearchMeetupsRequest, LocationType, Meetup, MeetupsFactory, SearchDto} from '@chumm-uffa/interface';
import {DBMeetup, MeetupPopulate} from '../models/meetup/model';

export class SearchController extends BaseController {

//     public searchtestMeetups(req: Request, res: Response) {
//
//         const searchRequest: ISearchMeetupsRequest = req.body;
//
//
//         const searchDto = searchRequest.searchDto;
//
//
//         40000 / 360
//
//
//         // Umrechungen km zu grad
//        //  let radius = searchDto.radius / 111.317;
//
//
// /*
// spherical benutzt Radiant für Distanzen -> ergo müssen wir den Radius unseres Suchkreises in Radiant umrechnen.
//  */
//
//         let one = 0.01745329251994329576923690768489;
//
//
//         const searchRadius = searchDto.radius * 2 * Math.PI / 40074;
//
//
//
//         let zr = DBMeetup.find().where('location')
//             .within({ center: [searchDto.latitude, searchDto.longitude], radius: searchRadius, unique: true, spherical: true });
//
//         // let zr = DBMeetup.find({'from': {'$gte': searchDto.fromDateTime}, 'to': {'$lte': searchDto.toDateTime}})
//         //
//         //
//         // if (searchDto.locationType === LocationType.INDOOR && searchDto.indoor) {
//         //     zr = zr.find({indoor: searchDto.indoor});
//         // }
//         // if (searchDto.locationType === LocationType.OUTDOOR && searchDto.outdoor) {
//         //     zr = zr.find({outdoor: new RegExp(searchDto.outdoor, 'i')})
//         // }
//         zr.populate(MeetupPopulate).then((dbMeetups) => {
//             let promise: Promise<any>[] = [];
//             let meetups: Meetup[] = [];
//             for (let dbMeetup of dbMeetups) {
//                 promise.push(dbMeetup.toInterface().then( (meetup) => {
//                     meetups.push(meetup);
//                 }));
//             }
//             Promise.all(promise).then( () => {
//                 meetups = meetups.filter(this.getPersonFilter(searchDto));
//                 res.json(MeetupsFactory.createSearchMeetupResponse(true, '', meetups));
//             });
//         }).catch((err) => {
//             this.logger.error(err.toString());
//             res.status(500);
//             res.json(MeetupsFactory.createSearchMeetupResponse(false, err.toString()));
//             return;
//         });
//     }


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

        let zr = DBMeetup.find({'from': {'$gte': searchDto.fromDateTime}, 'to': {'$lte': searchDto.toDateTime}})
        if (searchDto.locationType === LocationType.INDOOR && searchDto.indoor) {
            zr = zr.find({indoor: searchDto.indoor});
        }
        if (searchDto.locationType === LocationType.OUTDOOR && searchDto.outdoor) {
            zr = zr.find({outdoor: new RegExp(searchDto.outdoor, 'i')});
        }
        if (searchDto.locationType === LocationType.OUTDOOR && searchDto.latitude && searchDto.radius) {
            /*
            spherical benutzt Radiant für Distanzen -> ergo müssen wir den Radius unseres Suchkreises in Radiant umrechnen.
             */
            const searchRadius = searchDto.radius * 2 * Math.PI / 36877;
            zr = zr.find().where('location')
                .within({ center: [searchDto.latitude, searchDto.longitude], radius: searchRadius, unique: true, spherical: true });
        }
        zr.populate(MeetupPopulate).then((dbMeetups) => {
            let promise: Promise<any>[] = [];
            let meetups: Meetup[] = [];
            for (let dbMeetup of dbMeetups) {
                promise.push(dbMeetup.toInterface().then( (meetup) => {
                    meetups.push(meetup);
                }));
            }
            Promise.all(promise).then( () => {
                meetups = meetups.filter(this.getPersonFilter(searchDto));
                res.json(MeetupsFactory.createSearchMeetupResponse(true, '', meetups));
            });
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