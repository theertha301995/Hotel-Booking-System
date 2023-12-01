import mongoose, { Document, Model, Schema } from 'mongoose';

export interface AdminDoc extends Document {
  username: string;
  password: string;
  email:string;
  isAdmin: boolean;
}

const adminSchema = new Schema<AdminDoc>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const AdminModel: Model<AdminDoc> = mongoose.model('Admin', adminSchema);

export default AdminModel;