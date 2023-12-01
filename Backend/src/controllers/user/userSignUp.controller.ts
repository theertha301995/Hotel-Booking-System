import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../models/user/user.model';

export default class UserReg {
  async create(req: Request, res: Response) {
    const { firstname, lastname, email, password } = req.body;

    try {
      if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      const newUser = await UserModel.create({ firstname, lastname, email, password: hashedPassword });

      res.status(201).json({
        message: 'User created successfully',
        user: newUser
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
