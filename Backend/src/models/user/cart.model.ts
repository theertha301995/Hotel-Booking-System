// Cart Model
import mongoose, { Document, Schema } from 'mongoose';

export interface CartDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
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

const cartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel', // Reference to User model
      required: true,
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
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model<CartDocument>('Cart', cartSchema);

export default Cart;
