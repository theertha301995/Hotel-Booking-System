import Express from "express";
import HotelModel from "../../models/admin/hotels.model";
import { Request,Response } from "express";
import Order from "../../models/user/order.model";
import UserModel from "../../models/user/user.model";
import RoomModel from "../../models/admin/rooms.model";

export default class OrderDelete
{
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Get the ID from the request params

      const deletedHotel = await Order.findByIdAndUpdate(id, { deleted: true }, { new: true });
      

      if (!deletedHotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      res.status(200).json({
        message: 'Hotel soft-deleted successfully',
        deletedHotel,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: 'error!!!'
      });
    }
  }
  async getCancelledBookings(req: any, res: Response) {
    try {
      const cancelledOrders = await Order.find({ deleted: true }).populate({
        path: 'userId', 
        model: UserModel,
        select: 'email password' 
    }).populate({
        path: 'hotels.hotelId',
        model: HotelModel,
    }).populate({
      path:'hotels.rooms.roomId',
        model: RoomModel,
    }).exec();
  
      res.status(200).json({
        message: 'Cancelled bookings fetched successfully',
        cancelledOrders,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: 'error!!!'
      });
    }
  }
}
