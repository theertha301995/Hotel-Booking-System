// search.controller.ts
import { Request, Response } from 'express';
import HotelModel, { HotelDoc } from '../../models/admin/hotels.model';
import RoomModel, { RoomDoc } from '../../models/admin/rooms.model';
import { FilterQuery } from 'mongoose';

export default class HotelSearch {
  async searchHotels(req: Request, res: Response) {
    const { location, startdate, enddate } = req.query as { location: string; startdate: string; enddate: string };

    try {
      const searchCriteria: FilterQuery<HotelDoc> = {};

      if (location) {
        searchCriteria.location = { $regex: new RegExp(location, 'i') };
      }

      
      if (startdate && enddate) {
       
        const availableRooms = await RoomModel.find({
          $and: [
            { startdate: { $lte: new Date(enddate) } },
            { enddate: { $gte: new Date(startdate) } },
          ],
        });

        
        const roomIdsWithAvailableRooms = availableRooms.map((room) => room._id);

      
        searchCriteria['rooms.roomId'] = { $in: roomIdsWithAvailableRooms };
      }

      
      const searchResults = await HotelModel.find(searchCriteria).exec();

      res.status(200).json({ message: 'Search successful', results: searchResults });
    } catch (error) {
      console.error('Error during hotel search:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
