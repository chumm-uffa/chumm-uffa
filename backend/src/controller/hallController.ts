/**
 * chumm-uff
 **/
import { Request, Response, Router } from 'express';
import { BaseController } from './baseController';
import { DBHall } from "../models/hall/model";
import { HallsFactory, Hall } from '@chumm-uffa/interface';

export class HallController extends BaseController {

    /**
     * Initial load of all Hall
     */
    public loadAllHall() {
        let halls = [];
        halls.push({key: '1', name: 'Adelboden - Freizeit- und Sportarena Adelboden'});
        halls.push({key: '2', name: 'Basel - Kletterhalle 7'});
        halls.push({key: '3', name: 'Biel - Crux-Bouldering'});
        halls.push({key: '4', name: 'Chur - Kletterhalle AP n Daun'});
        halls.push({key: '5', name: 'Davos - Kletterwand Davos'});
        halls.push({key: '6', name: 'Interlaken - K44 - Kletterhalle Interlaken'});
        halls.push({key: '7', name: 'küblis - kletterhalle küblis'});
        halls.push({key: '8', name: 'Küblis - Kletterhalle SAC Prättigau'});
        halls.push({key: '9', name: 'Langnau - Climbox'});
        halls.push({key: '10', name: 'Lenzburg - Kraftraktor'});
        halls.push({key: '11', name: 'Luzern - Kletterhalle Eiselin Luzern'});
        halls.push({key: '12', name: 'Meiringen - Kletterhalle Haslital'});
        halls.push({key: '13', name: 'Nidau BE - Sporttreff Ziehl AG'});
        halls.push({key: '14', name: 'Niederwangen - Magnet'});
        halls.push({key: '15', name: 'Näfels - Lintharena'});
        halls.push({key: '16', name: 'Porrentruy - Salle d escalade des Tilleuls'});
        halls.push({key: '17', name: 'Pratteln - Boulders & Bar'});
        halls.push({key: '18', name: 'Root Längenbold - Pilatur Indoor Kletterzentrum Zentralschweiz'});
        halls.push({key: '19', name: 'Schaffhausen - Aranea Kletterzentrum'});
        halls.push({key: '20', name: 'St. Gallen - Kletterhalle St. Gallen'});
        halls.push({key: '21', name: 'Taverne - Evolution Center'});
        halls.push({key: '22', name: 'Thun - Klettertreff Thun'});
        halls.push({key: '23', name: 'Winterthur - Block Winterthur'});
        halls.push({key: '24', name: 'Zäziwil - ZäziBoulder'});
        halls.push({key: '25', name: 'Zürich - Kletterzentrum Gaswerk AG'});

        DBHall.remove({}).then(() => {
            DBHall.insertMany(halls).then(() => {
                console.log('Successfully load Halls');
            }).catch((err) => {
                this.logger.error(err.toString());
                console.log('Error while inital load of Halls, stop execution');
                process.exit()
            });
        }).catch((err) => {
            this.logger.error(err.toString());
            console.log('Error while inital remove of Halls, stop execution');
            process.exit()
        });
    }

    /**
     * Getting all available hall
     * @param {Request} req
     * @param {Response} res
     */9
    public allHall(req: Request, res: Response){
        DBHall.find({}).then( (dbHalls) => {
            let halls: Hall[] = [];
            for (let dbHall of dbHalls) {
                halls.push(dbHall.toInterface());
            }
            res.json(HallsFactory.createGetAllHallsResponse(true, '', halls));
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(HallsFactory.createGetAllHallsResponse(false, 'something went wrong.'));
            return;
        });
    }

    /**
     * Getting all available hall
     * @param {Request} req
     * @param {Response} res
     */
    public getHall(req: Request, res: Response){
        DBHall.findOne({ key: req.params.key }).then( (dbHall) => {
            if (dbHall) {
                res.json(HallsFactory.createGetHallRespons(true,  '', dbHall.toInterface()));
                return;
            }
            res.status(400);
            res.json(HallsFactory.createGetHallRespons(false, 'hall not exits.'));
            return;
        }).catch((err) => {
            this.logger.error(err.toString());
            res.status(500);
            res.json(HallsFactory.createGetHallRespons(false, 'something went wrong.'));
            return;
        });
    }
}