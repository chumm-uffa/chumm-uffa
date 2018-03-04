/**
 * Class Factory for push notificatons
 */

import {IPushNotification, NotificationId, PushNotification} from '../interface/notifications/pushNotification';

export class PushNotificationFactory {
    /**
     * Creates a new push notification
     * @param {NotificationId} id
     * @param data
     * @returns {IPushNotification}
     */
    static createPushNotification(id: NotificationId, data: any): IPushNotification {
        const notification = new PushNotification();
        notification.id = id;
        notification.data = data;
        return notification;
    }

}
