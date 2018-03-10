export enum NotificationId {
    MEETUPS_DATA_CHANGED,
    HALLS_DATA_CHANGED,
}

export class PushNotification {
    public id: NotificationId;
    public info: string;

    constructor(id: NotificationId, info: string) {
        this.id = id;
        this.info = info;
    }

    public toJSON() {
        return {
            id: this.id,
            info: this.info
        };
    }

    public static fromJSON(json: any) {
        return  new PushNotification(json.id, json.info);
    }
}