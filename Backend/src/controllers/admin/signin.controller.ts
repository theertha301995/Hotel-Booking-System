import { Request, Response } from 'express';
import AdminModel from '../../models/admin/logins.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AdminSignIn {
  async login(req: Request, res: Response) {
    const { username, password, email } = req.body;

    try {
      // Check if a user with the provided username already exists in the database
      const existingUser = await AdminModel.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: 'Username already in use' });
      }

      if (existingUser === null) {
        // Hash the provided password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await AdminModel.create({ username, password: hashedPassword, email });

        // Generate a JWT token with user information
        const token = jwt.sign({ email: newUser.email, userId: newUser.id }, '#thdgdf9', { expiresIn: '3000h' });
        res.status(201).json({ token });
      }
    } catch (error) {
      console.error('Error creating signin:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
