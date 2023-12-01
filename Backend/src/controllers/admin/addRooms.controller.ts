import { Request, Response } from 'express';
import RoomModel, { RoomDoc } from '../../models/admin/rooms.model';

export default class RoomController {
    async create(req: Request, res: Response) {
      try {
        const { roomname, price, bedrooms, startdate, enddate,roomno,bathrooms,adults,kids,description,hotelnames } = req.body;
        const files = req.files as Express.Multer.File[];
  
        const missingFields = [];
        if (!roomname) missingFields.push('roomname');
        if (!price) missingFields.push('price');
        if (!bedrooms) missingFields.push('bedrooms');
        if (!startdate) missingFields.push('startdate');
        if (!enddate) missingFields.push('enddate');
        if (!files) missingFields.push('files');
        if (!roomno) missingFields.push('rommno');
        if (!bathrooms) missingFields.push('bathrooms');
        if (!adults) missingFields.push('adults');
        if (!kids) missingFields.push('kids');
        if (!description) missingFields.push('description');
        if (missingFields.length > 0) {
          return res.status(400).json({
            message: `Validation error: Missing required fields (${missingFields.join(', ')})`,
          });
        }
  
        const image = files.map((file: Express.Multer.File) => file.filename);
        const moment = require('moment');
        const startDateObject = moment(startdate, 'YYYY-MM-DD').toDate();
const endDateObject = moment(enddate, 'YYYY-MM-DD').toDate();
  
        const createRoom = await RoomModel.create({
          roomname,
          image,
          hotelnames,
          price,
          bedrooms,
          startdate: startDateObject,
          enddate: endDateObject,
          roomno,
          bathrooms,
          adults,
          kids,
          description
        });
  
        res.status(201).json({
          message: "Rooms Details Entered Successfully",
          room: createRoom,
        });
      } catch (err) {
        console.error('Error creating Room:', err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
