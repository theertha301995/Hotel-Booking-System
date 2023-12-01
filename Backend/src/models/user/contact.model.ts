import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ContactDoc extends Document {
  fname: string;
  lname: string;
  emails:string;
  msg: string;
  phone:string;
}

const contactSchema = new Schema<ContactDoc>({
  fname: {
    type: String,
    required: true,
    unique: true,
  },
  lname: {
    type: String,
    required: true,
  },
  emails: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const ContactModel: Model<ContactDoc> = mongoose.model('contacts', contactSchema);

export default ContactModel;