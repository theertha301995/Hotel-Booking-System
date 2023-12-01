import mongoose, { Document, Model, Schema } from 'mongoose';

export interface HotelDoc extends Document {
  hotelname: string;
  amenity1: string;
  amenity2: string;
  amenity3: string;
  amenity4:string;
  amenity5:string;
  amenity6:string;
  image: string[]; // This field stores the filename of the image
  location: string;
  rooms: [
    {
     
      roomId: mongoose.Schema.Types.ObjectId;
    }
  ];
 
  deleted: boolean;
}



const hotelSchema = new Schema<HotelDoc>({
  hotelname: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  amenity1: {
    type: String,
    
  },
  amenity2: {
    type: String,
    
  },
  amenity3: {
    type: String,
  },
  amenity4: {
    type: String,
  },
  amenity5: {
    type: String,
   
  },
   amenity6: {
    type: String,
   
  },
  image: {
    type: [String],
    required: true,
  },
  rooms: [
    {
      roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomModel', // Reference to Room model
        required: true,
      }
    }
  ],
  deleted: {
    type: Boolean,
    default: false, // Not deleted by default
  },
}, { timestamps: true });

const HotelModel: Model<HotelDoc> = mongoose.model('Hotel', hotelSchema);

export default HotelModel;
