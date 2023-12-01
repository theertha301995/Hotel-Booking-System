import mongoose, { Document, Model, Schema } from 'mongoose';

export interface BlockRoomDoc extends Document {
    userId: mongoose.Schema.Types.ObjectId;
 
    hotelId: mongoose.Schema.Types.ObjectId;
    deleted: boolean;
}

const BlockroomSchema = new Schema<BlockRoomDoc>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
   
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomModel', // Reference to Room model
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const BlockRoomModel: Model<BlockRoomDoc> = mongoose.model('BlockRoom', BlockroomSchema);

export default BlockRoomModel;
