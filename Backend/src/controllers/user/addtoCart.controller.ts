import { Request, Response } from "express";
import Cart, { CartDocument } from '../../models/user/cart.model';
import mongoose from "mongoose";
 
export default class CartController {
  // Create a new cart
  async createCart(req: any, res: Response) {
    try {
      const { hotels } = req.body;
       
      if (!(hotels?.length>0)) {
        return res.status(400).json({ error: 'hotels are required ' });
      }

      // Check if newroomno is provided for each hotel
      for (let hotel of hotels) {
        if (!hotel.newroomno) {
          return res.status(400).json({ error: 'newroomno is required for each hotel' });
        }
      }
     
      // Create a new cart item using the create function
      const newCart = await Cart.create({
        userId: req.userData.userId,  // Use userId from req.userData
        hotels: hotels,
      });
 
      res.status(201).json(newCart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}