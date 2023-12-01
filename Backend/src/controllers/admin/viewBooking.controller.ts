import { Request, Response } from 'express';
import Order, { OrderDocument } from '../../models/user/order.model';
import HotelModel from '../../models/admin/hotels.model';
import RoomModel from '../../models/admin/rooms.model';
import UserModel from '../../models/user/user.model'; // Import the User model

export default class ViewBooking {
    async findAll(req: Request, res: Response) {
        try {
            
            const chekoutData = await Order.find({}).populate({
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
            res.send(chekoutData);
            console.log(chekoutData);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
            console.log(error);
        }
    }
}
