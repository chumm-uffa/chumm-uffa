export class SearchDto {
    private _fromDateTime: string;
    private _toDateTime: string;
    private _locationType: string;
    private _indoor: string;
    private _outdoor: string;
    private _sex: string;
    private _weightMin: string;
    private _weightMax: string;

    constructor(fromDateTime: string, toDateTime: string, locationType: string, indoor: string, outdoor: string, sex: string, weightMin: string, weightMax: string) {
        this._fromDateTime = fromDateTime;
        this._toDateTime = toDateTime;
        this._locationType = locationType;
        this._indoor = indoor;
        this._outdoor = outdoor;
        this._sex = sex;
        this._weightMin = weightMin;
        this._weightMax = weightMax;
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
            weightMax: this.weightMax
        };
    }

    get fromDateTime(): string {
        return this._fromDateTime;
    }

    get toDateTime(): string {
        return this._toDateTime;
    }

    get locationType(): string {
        return this._locationType;
    }

    get indoor(): string {
        return this._indoor;
    }

    get outdoor(): string {
        return this._outdoor;
    }

    get sex(): string {
        return this._sex;
    }

    get weightMin(): string {
        return this._weightMin;
    }

    get weightMax(): string {
        return this._weightMax;
    }
}
