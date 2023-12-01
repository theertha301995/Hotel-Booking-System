import { Request, Response } from 'express';
import AdminModel from '../../models/admin/logins.model';
 
export default class ViewAdmins {
  async findAll(req: Request, res: Response) {
    try {
      const admins = await AdminModel.find({}, 'username').exec();
      const usernames: string[] = admins.map((admin) => admin.username);
      res.send(usernames);
    } catch (error) {
      console.error('Error fetching admin usernames:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}