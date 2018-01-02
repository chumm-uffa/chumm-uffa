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
        halls.push({name: 'Adelboden - Freizeit- und Sportarena Adelboden'});
        halls.push({name: 'Basel - Kletterhalle 7'});
        halls.push({name: 'Biel - Crux-Bouldering'});
        halls.push({name: 'Chur - Kletterhalle AP n Daun'});
        halls.push({name: 'Davos - Kletterwand Davos'});
        halls.push({name: 'Interlaken - K44 - Kletterhalle Interlaken'});
        halls.push({name: 'küblis - kletterhalle küblis'});
        halls.push({name: 'Küblis - Kletterhalle SAC Prättigau'});
        halls.push({name: 'Langnau - Climbox'});
        halls.push({name: 'Lenzburg - Kraftraktor'});
        halls.push({name: 'Luzern - Kletterhalle Eiselin Luzern'});
        halls.push({name: 'Meiringen - Kletterhalle Haslital'});
        halls.push({name: 'Nidau BE - Sporttreff Ziehl AG'});
        halls.push({name: 'Niederwangen - Magnet'});
        halls.push({name: 'Näfels - Lintharena'});
        halls.push({name: 'Porrentruy - Salle d escalade des Tilleuls'});
        halls.push({name: 'Pratteln - Boulders & Bar'});
        halls.push({name: 'Root Längenbold - Pilatur Indoor Kletterzentrum Zentralschweiz'});
        halls.push({name: 'Schaffhausen - Aranea Kletterzentrum'});
        halls.push({name: 'St. Gallen - Kletterhalle St. Gallen'});
        halls.push({name: 'Taverne - Evolution Center'});
        halls.push({name: 'Thun - Klettertreff Thun'});
        halls.push({name: 'Winterthur - Block Winterthur'});
        halls.push({name: 'Zäziwil - ZäziBoulder'});
        halls.push({name: 'Zürich - Kletterzentrum Gaswerk AG'});

        // Onle load once
        DBHall.count({}).then((result) => {
            if (result == 0) {
                DBHall.insertMany(halls).then(() => {
                    console.log('Successfully load Halls');
                }).catch((err) => {
                    this.logger.error(err.toString());
                    console.log('Error while inital load of Halls, stop execution');
                    process.exit()
                });
            }
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
        DBHall.findById(req.params.key).then( (dbHall) => {
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