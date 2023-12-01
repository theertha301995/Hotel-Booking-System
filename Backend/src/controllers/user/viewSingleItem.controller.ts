import { Request, Response } from 'express';
import HotelModel from '../../models/admin/hotels.model';
import RoomModel from '../../models/admin/rooms.model';

export default class ViewSinglItem {
  async getHotelById(req: Request, res: Response) {
    try {
      const searchId = req.params.id; // Assuming the ID is in the URL parameters

      const searchData = await HotelModel.findById(searchId).populate({
        path: 'rooms.roomId',
        model: RoomModel,
      }
        
      ).exec();

      if (!searchData) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      res.status(200).json({ message: 'Hotel found', hotel: searchData });
    } catch (error) {
      console.error('Error getting hotel:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
