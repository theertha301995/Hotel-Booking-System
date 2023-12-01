import { Request, Response } from 'express';
import RoomModel from '../../models/admin/rooms.model';
 
export default class ViewRooms {
    async findAll(req: Request, res: Response) {
      
        const roomData = await RoomModel.find({}).exec();
        res.send(roomData);
        console.log(roomData);
      } 
}
