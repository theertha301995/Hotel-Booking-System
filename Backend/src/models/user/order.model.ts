import mongoose, { Document, Schema } from 'mongoose';

export interface OrderDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  checkin: Date; // New field for check-in date
  checkout: Date; // New field for check-out date
  hotels: [
    {
      hotelId: mongoose.Schema.Types.ObjectId;
      newroomno: number;
      rooms: [
        {
          roomId: mongoose.Schema.Types.ObjectId;
        }
      ];
    }
    
  ];
 
  deleted: boolean;
}

const orderSchema = new Schema<OrderDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel', // Reference to UserModel
    
    },
    checkin: {
      type: Date,
     
    },
    checkout: {
      type: Date,
      
    },
    hotels: [
      {
        hotelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'HotelModel', // Reference to Hotel model
          required: true,
        },
        newroomno: {
          type: Number,
          required: true,
        },
      
    
    rooms: [
      {
        roomId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'RoomModel', // Reference to Room model
          required: true,
        },
      },
    ],
  }
  ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;
