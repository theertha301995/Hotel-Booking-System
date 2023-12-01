import { Request, Response } from 'express';
import HotelModel from '../../models/admin/hotels.model';
import Cart from '../../models/user/cart.model';
import RoomModel from '../../models/admin/rooms.model';
 
export default class ViewCart {
    async findAll(req: any, res: Response) {
      
        const cartData = await Cart.find({}).populate(
        {
          path: 'hotels.hotelId',
          model: HotelModel,
          
        }
        )
        .populate({
          path:'hotels.rooms.roomId',
          model:RoomModel,
        }).exec();
        res.send(cartData);
        console.log(cartData);
      } 
}
