import { Request, Response } from 'express';
import HotelModel, { HotelDoc } from '../../models/admin/hotels.model';
import RoomModel, { RoomDoc } from '../../models/admin/rooms.model';

export default class UserHotelsView {
  async findAll(req: Request, res: Response) {
    try {
     
      const hotelData: HotelDoc[] = await HotelModel.find({}).populate({
        path: 'rooms.roomId',
        model: RoomModel,
      }).exec();

      // Map through hotelData and calculate the total price
      const hotelsWithTotalPrice = await Promise.all(hotelData.map(async (hotel) => {
        const totalPrice = await Promise.all(
          hotel.rooms.map(async (room: { roomId: RoomDoc['_id'] }) => {
            const roomData = await RoomModel.findById(room.roomId);
            return roomData?.price || 0;
          })
        ).then((prices) => prices.reduce((sum, price) => sum + price, 0));

        return {
          ...hotel.toObject(),
          totalPrice,
        };
      }));

      console.log(hotelsWithTotalPrice); // Log populated data with totalPrice

      res.json({ message: 'Search successful', results: hotelsWithTotalPrice });
    } catch (error) {
      console.error('Error finding hotels:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
