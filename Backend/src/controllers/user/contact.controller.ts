// hotel.controller.ts
import { Request, Response } from "express";
import ContactModel from "../../models/user/contact.model";

export default class ContactController {
  async create(req: Request, res: Response) {
    try {
      const { fname, lname, emails, msg, phone } = req.body;
  
      // Perform validation if necessary
  
      const createContact = await ContactModel.create({
        fname,
        lname,
        msg,
        emails,
        phone,
      });
  
      res.status(201).json({
        message: "Message entered successfully",
        contact: createContact,
      });
    } catch (err:any) {
      console.error('Error creating contacts:', err);
  
      // Handle specific database errors
      if (err.code === 11000) {
        res.status(400).json({ message: "Duplicate entry. Contact already exists." });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
