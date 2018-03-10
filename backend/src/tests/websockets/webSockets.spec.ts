/**
 * chumm-uffa
 *
 * Unit test for websocket
 */

import { BaseTest } from '../BaseTest';
import * as WebSocket from 'ws';

import * as cuint from '@chumm-uffa/interface';

const baseTest: BaseTest = new BaseTest();


describe('Test /meetups', () => {

    let meetup: cuint.Meetup;
    var wss: WebSocket;

    before((done) => {
        baseTest.login(done);
    });

    beforeEach((done) =>{
        wss = new WebSocket('ws://localhost:8080/?token=' + baseTest.token, {
            perMessageDeflate: false
        });
        wss.on('open', () => {
            // create a single meetup
            let myMeetup: cuint.Meetup = new cuint.Meetup(
                '', baseTest.testUser, new Date(), new Date(), 'outdoor', baseTest.halls[0].key, 'activity'
            );

            baseTest.chai.request(baseTest.server)
                .post(`${baseTest.route}meetups`)
                .set({authorization: baseTest.token})
                .send(cuint.MeetupsFactory.createCreateMeetupRequest(myMeetup))
                .end((err, res) => {
                    baseTest.assertSuccess(res);
                    res.body.should.have.property('meetup');
                    res.body.should.have.property('id');
                    meetup = res.body.meetup;
                    done();
                });
        });
    });

    it('it should create a new meetup', (done) => {
        let newChat: cuint.Chat = new cuint.Chat('', 'mal was anderes', baseTest.testUser);
        wss.on('message', (notification: string) => {
            const xx = JSON.parse(notification);
            const message: cuint.PushNotification = cuint.PushNotification.fromJSON(JSON.parse(notification));
            message.should.have.property('id');
            message.should.have.property('info');
            message.id.should.be.equals(cuint.NotificationId.MEETUPS_DATA_CHANGED)
            done();
        });
        baseTest.chai.request(baseTest.server)
            .post(`${baseTest.route}meetups/${meetup.id}/chats`)
            .set({authorization: baseTest.token})
            .send(cuint.MeetupsFactory.createCreateChatForMeetupRequest(newChat))
            .end((err, res) => {
                baseTest.assertSuccess(res);
                res.body.should.have.property('chat');
                res.body.should.have.property('id');
            });
    });
});
