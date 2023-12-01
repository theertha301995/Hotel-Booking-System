import Express from "express";
import HotelModel from "../../models/admin/hotels.model";
import { Request,Response } from "express";

export default class HotelDelete
    {
        async delete(req: Request, res: Response) {
            try {
              const { id } = req.params; // Get the ID from the request params
        
              const deletedHotel = await HotelModel.findByIdAndUpdate(id, { deleted: true }, { new: true });
        
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
    }
