import { Request, Response } from 'express';
import Order, { OrderDocument } from '../../models/user/order.model';
import mongoose from 'mongoose';
import HotelModel from '../../models/admin/hotels.model';
import RoomModel from '../../models/admin/rooms.model';
import Cart from '../../models/user/cart.model';

export default class ViewCheckout {
    async findAll(req: any, res: Response) {
        try {
            const user = req.userData;
            const chekoutData = await Order.find({userId: user.userId }).populate({
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
        }
    }

   
    
}