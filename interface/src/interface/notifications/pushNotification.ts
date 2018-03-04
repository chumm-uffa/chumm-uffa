export interface IPushNotification{
    id: NotificationId;
    data: any;
}
export enum NotificationId {
    MEETUPS_DATA_CHANGED,
    HALLS_DATA_CHANGED,
}
export class PushNotification implements IPushNotification{
    public id: NotificationId;
    public data: any;

    public toJSON() {
        return {
            id: this.id,
            date: this.data
        };
    }

    public static fromJSON(json: any) {
        const notifiaction =  new PushNotification();
        notifiaction.id = json.id;
        notifiaction.data = json.data;
        return notifiaction;
    }
}