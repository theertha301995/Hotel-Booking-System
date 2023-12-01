import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../models/user/user.model';

import jwt from 'jsonwebtoken';


export default class UserSignIn {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await UserModel.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Store login details in the new collection (LoginModel)
      const hashedPassword = await bcrypt.hash(password, 10);
     
      // Generate a JWT token with user information

      const token = jwt.sign({ email,userId: user.id }, '#gdey78', { expiresIn: '3000h' });
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
