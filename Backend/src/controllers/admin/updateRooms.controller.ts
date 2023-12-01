import { Request, Response } from 'express';
import RoomModel from '../../models/admin/rooms.model';
export default class RoomUpdate {
 updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  // If there are files uploaded, update the image field
  if (req.files) {
    const files = req.files as Express.Multer.File[];
    const fileNames = files.map(file => file.filename);
    updates.image = fileNames;
  }
  try {
    const updatedRoom = await RoomModel.findOneAndUpdate({ _id: id }, updates, { new: true });

    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room updated successfully', hotel: updatedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Room', error });
  }
};
  }
