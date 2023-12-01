// hotel.controller.ts
import { Request, Response } from "express";
import HotelModel from "../../models/admin/hotels.model";
import mongoose from "mongoose";

export default class HotelController {
  async create(req: Request, res: Response) {
    try {
      const { rooms,hotelname,amenity1,amenity2,amenity3,amenity4,amenity5,amenity6, location, } = req.body;
      const files = req.files as Express.Multer.File[];

      if (!hotelname || !location || !files || files.length === 0 ) {
        return res.status(400).json({ message: "Validation error: Missing required fields or image or check-in/check-out dates" });
      }
  
      if (!(rooms?.length>0)) {
        return res.status(400).json({ error: 'rooms are required ' });
      }

      const image = files.map((file: Express.Multer.File) => file.filename);

      const createHotel = await HotelModel.create({
        hotelname,
        rooms:rooms,
        image,
        location,
        amenity1,
        amenity2,
        amenity3,
        amenity4,
        amenity5,
        amenity6,
      });

      res.status(201).json({
        message: "Hotel Details Entered Successfully",
        hotel: createHotel,
      });
    } catch (err) {
      console.error('Error creating Hotel:', err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
