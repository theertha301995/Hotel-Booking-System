import { Request, Response, response } from "express";
import Cart, { CartDocument } from '../../models/user/cart.model';
import Order from '../../models/user/order.model';
import RoomModel from '../../models/admin/rooms.model';
import mongoose from 'mongoose';
import HotelModel from '../../models/admin/hotels.model';
import moment from "moment";

export default class OrderController {
  async createOrder(req: any, res: Response) {
    try {
      const user = req.userData;

      const cartData = await Cart.findOne({ userId: user.userId })
        .populate({
          path: 'hotels.hotelId',
          model: HotelModel,
        })
        .populate({
          path: 'hotels.rooms.roomId',
          model: RoomModel,
        })
        .exec();

      if (!cartData) {
        return res.status(404).json({ message: 'Cart not found for this user' });
      }

      // Check if room is available
      for (let hotel of cartData.hotels) {
        for (let room of hotel.rooms) {
          const roomData = await RoomModel.findById((room.roomId as any)._id).exec();
          if (roomData && roomData.roomno <= 0) {
            return res.status(400).json({ message: 'Sorry, room not available.' });
          }
        }
      }

      const orderData = {
        userId: user.userId,
        hotels: cartData.hotels.map((hotel) => ({
          hotelId: hotel.hotelId,
          newroomno: hotel.newroomno,
          rooms: hotel.rooms.map((room) => ({
            roomId: room.roomId,
          })),
          hotelDetails: hotel.hotelId,
        })),
      };

      const newOrder = await Order.create(orderData);

      // Update roomno in Room model
      for (let hotel of cartData.hotels) {
        for (let room of hotel.rooms) {
          try {
            await RoomModel.updateOne(
              { _id: (room.roomId as any)._id },
              { $inc: { roomno: -hotel.newroomno } }
            );
          } catch (error) {
            console.error('Error updating room number:', error);
          }
        }
      }
      await Cart.deleteOne({ userId: user.userId });

      res.status(201).json({
        message: 'Order created successfully',
        order: newOrder,
        userId: user.userId,
        hotelDetails: cartData.hotels,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async checkRoomAvailability(req: Request, res: Response) {
    try {
      const { roomId, checkInDate, checkOutDate } = req.body;
  
      // Validate dates using moment
      const checkinMoment = moment(checkInDate, "YYYY-MM-DD", true);
      const checkoutMoment = moment(checkOutDate, "YYYY-MM-DD", true);
  
      if (!checkinMoment.isValid() || !checkoutMoment.isValid()) {
        return res.status(400).json({ message: "Invalid date format" });
      }
  
      if (checkoutMoment.isBefore(checkinMoment)) {
        return res.status(400).json({ message: "No rooms available for this date" });
      }
      if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ message: "Invalid roomId format" });
      }
  
      // Find the room with the given ID
      const roomData = await RoomModel.findById(roomId).exec();
      if (!roomData) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      // Find all orders for this room within the given date range
      const orders = await Order.find({
        "hotels.rooms.roomId": roomId,
        $or: [
          {
            $and: [
              { checkin: { $lte: roomData.enddate } },
              { checkout: { $gte: roomData.startdate } },
            ],
          },
          {
            $and: [
              { checkin: { $gte: roomData.startdate } },
              { checkin: { $lte: roomData.enddate } },
            ],
          },
          {
            $and: [
              { checkout: { $gte: roomData.startdate } },
              { checkout: { $lte: roomData.enddate } },
            ],
          },
        ],
      });
  
      if (orders.length > 0 ||
          !moment(checkOutDate).isSameOrAfter(roomData.startdate) ||
          !moment(checkInDate).isSameOrBefore(roomData.enddate)) {
        return res.status(400).json({ message: "Room not available for the selected dates" });
      }
  
      return res.status(200).json({ message: "Room is available for the selected dates" });
    } catch (error) {
      console.error("Error checking room availability:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  
}

