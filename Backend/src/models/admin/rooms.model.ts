import mongoose, { Document, Model, Schema } from 'mongoose';

export interface RoomDoc extends Document {
  roomname: string;
  hotelnames:string
  image: string[]; // This field stores the filename of the image
  bedrooms: number;
  price: number;
  bathrooms:number;
  adults:number;
  kids:number;
  description:string;
  startdate: Date; // New field for check-in date
  enddate: Date; // New field for check-out date
  deleted: boolean;
  roomno:number;
  
}

const roomSchema = new Schema<RoomDoc>({
  roomname: {
    type: String,
    required: true,
  },
  hotelnames: {
    type: String,
   
  },
  roomno: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  kids: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false, // Not deleted by default
  },
}, { timestamps: true });

const RoomModel: Model<RoomDoc> = mongoose.model('Room', roomSchema);

export default RoomModel;
