import { Request, Response } from 'express';
import HotelModel from '../../models/admin/hotels.model';
import RoomModel from '../../models/admin/rooms.model';
import { model } from 'mongoose';
 
export default class ViewHotels {
  async findAll(req: Request, res: Response) {
    try {
      const hotelData = await HotelModel.find({})
        .populate({path:'rooms',
        model:RoomModel})
        .populate({path:'rooms.roomId',model:RoomModel})
        .exec();
      res.send(hotelData);
      console.log(hotelData);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
