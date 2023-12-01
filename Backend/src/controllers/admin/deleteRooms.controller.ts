import Express from "express";
import RoomModel from "../../models/admin/rooms.model"
import { Request,Response } from "express";

export default class RoomDelete
    {
        async delete(req: Request, res: Response) {
            try {
              const { id } = req.params; // Get the ID from the request params
        
              const deletedRoom = await RoomModel.findByIdAndUpdate(id, { deleted: true }, { new: true });
        
              if (!deletedRoom) {
                return res.status(404).json({ message: 'Rooms not found' });
              }
        
              res.status(200).json({
                message: 'Hotel soft-deleted successfully',
                deletedRoom,
              });
            } catch (err) {
              res.status(500).json({
                message: 'Internal Server Error',
                error: 'error!!!'
              });
            }
          }
    }
