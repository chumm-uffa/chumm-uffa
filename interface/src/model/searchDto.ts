/**
 * The state of a request relation ship
 */
import {Sex} from './user';

export enum LocationType {
    INDOOR = 'in',
    OUTDOOR = 'out'
}

export class SearchDto {
    private _fromDateTime: Date;
    private _toDateTime: Date;
    private _locationType: LocationType;
    private _indoor: string;
    private _outdoor: string;
    private _sex: Sex;
    private _weightMin: number;
    private _weightMax: number;
    private _latitude: number;
    private _longitude: number;
    private _radius: number;

    constructor(fromDateTime: Date, toDateTime: Date, locationType: LocationType, indoor: string, outdoor: string, sex: Sex,
                weightMin: number, weightMax: number, latitude: number, longitude: number, radius: number) {
        this._fromDateTime = fromDateTime;
        this._toDateTime = toDateTime;
        this._locationType = locationType;
        this._indoor = indoor;
        this._outdoor = outdoor;
        this._sex = sex;
        this._weightMin = weightMin;
        this._weightMax = weightMax;
        this._latitude = latitude;
        this._longitude = longitude;
        this._radius = radius;
    }

    public toJSON() {
        return {
            fromDateTime: this.fromDateTime,
            toDateTime: this.toDateTime,
            locationType: this.locationType,
            indoor: this.indoor,
            outdoor: this.outdoor,
            sex: this.sex,
            weightMin: this.weightMin,
            weightMax: this.weightMax,
            latitude: this.latitude,
            longitude: this.longitude,
            radius: this.radius
        };
    }

    get fromDateTime(): Date {
        return this._fromDateTime;
    }

    get toDateTime(): Date {
        return this._toDateTime;
    }

    get locationType(): LocationType {
        return this._locationType;
    }

    get indoor(): string {
        return this._indoor;
    }

    get outdoor(): string {
        return this._outdoor;
    }

    get sex(): Sex {
        return this._sex;
    }

    get weightMin(): number {
        return this._weightMin;
    }

    get weightMax(): number {
        return this._weightMax;
    }

    get latitude(): number {
        return this._latitude;
    }

    get longitude(): number {
        return this._longitude;
    }

    get radius(): number {
        return this._radius;
    }
}
