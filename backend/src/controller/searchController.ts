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

        let zr = DBMeetup.find({'from': {'$gte': searchDto.fromDateTime}, 'to': {'$lte': searchDto.toDateTime}})
        if (searchDto.locationType === LocationType.INDOOR && searchDto.indoor) {
            zr = zr.find({indoor: searchDto.indoor});
        }
        if (searchDto.locationType === LocationType.OUTDOOR && searchDto.outdoor) {
            zr = zr.find({outdoor: new RegExp(searchDto.outdoor, 'i')});
        }
        if (searchDto.locationType === LocationType.OUTDOOR && searchDto.latitude && searchDto.radius) {
            const circumference = 40000; // earth in km
            const longitudeFactor = this.correctLongitude(searchDto.latitude);
            const boxquarter = this.calcBox(searchDto.radius, circumference);
            const lowerLeft = [searchDto.latitude - boxquarter, searchDto.longitude - (boxquarter / longitudeFactor)];
            const upperRight = [searchDto.latitude + boxquarter, searchDto.longitude + (boxquarter / longitudeFactor)];
            zr = zr.find().where('location').within().box(lowerLeft, upperRight);
        }
        zr.populate(MeetupPopulate).then((dbMeetups) => {
            let promise: Promise<any>[] = [];
            let meetups: Meetup[] = [];
            for (let dbMeetup of dbMeetups) {
                promise.push(dbMeetup.toInterface().then((meetup) => {
                    meetups.push(meetup);
                }));
            }
            Promise.all(promise).then(() => {
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

    /**
     * Korrekturfaktor für Distanz in Längengrad
     * anhand des Breitengrades -> das war früher viel einfacher
     * als die Erde noch eine Scheibe war...
     * @param lati
     * @returns {number}
     */
    private correctLongitude(lati): number {
        return Math.cos(2 * Math.PI * lati / 360);
    }

    /**
     * Umrechung km in Grad
     * @param radius
     * @param circumference
     * @returns {number}
     */
    private calcBox(radius, circumference): number {
        return radius * 360 / circumference;
    }
}