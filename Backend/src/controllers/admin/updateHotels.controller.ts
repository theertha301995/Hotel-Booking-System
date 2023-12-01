import { Request, Response } from 'express';
import HotelModel from '../../models/admin/hotels.model';
export default class HotelUpdate {
 updateHotel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  // If there are files uploaded, update the image field
  if (req.files) {
    const files = req.files as Express.Multer.File[];
    const fileNames = files.map(file => file.filename);
    updates.image = fileNames;
  }
  try {
    const updatedHotel = await HotelModel.findOneAndUpdate({ _id: id }, updates, { new: true });

    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({ message: 'Hotel updated successfully', hotel: updatedHotel });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel', error });
  }
};
  }
