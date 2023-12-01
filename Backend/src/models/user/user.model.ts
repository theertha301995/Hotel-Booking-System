import { Schema, Document, Model, model } from 'mongoose';


export interface UserReg extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  deleted: boolean;
}

const UserSchema: Schema = new Schema<UserReg>({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const UserModel: Model<UserReg> = model<UserReg>('User', UserSchema);

export default UserModel;
