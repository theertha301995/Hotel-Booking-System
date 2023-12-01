import express from 'express';
import HotelController from '../../controllers/admin/addHotels.controller';
import { uploadMiddleware } from '../../controllers/admin/uploadMiddleware';
import adminAuthenticateMiddleware from '../../controllers/admin/adminAuthenticateMiddleware';
import ViewHotels from '../../controllers/admin/viewHotels.controller';
import HotelDelete from '../../controllers/admin/deleteHotel.contoller';
import RoomController from '../../controllers/admin/addRooms.controller';
import ViewRooms from '../../controllers/admin/viewrooms.controller';
import RoomDelete from '../../controllers/admin/deleteRooms.controller';
import HotelUpdate from '../../controllers/admin/updateHotels.controller';
import RoomUpdate from '../../controllers/admin/updateRooms.controller';


const router = express.Router();
const hotelController = new HotelController();
const viewHotelController= new ViewHotels();
const updateHotelController= new HotelUpdate();
const deleteHotelController=new  HotelDelete();
const addRoomController= new RoomController();
const viewRoomController= new ViewRooms();
const updateRoomController= new RoomUpdate();
const deleteRoomController=new  RoomDelete();


// Define the route to create a hotel with the uploadMiddleware
router.post('/',adminAuthenticateMiddleware, uploadMiddleware.array("image",10), hotelController.create);
router.get('/', adminAuthenticateMiddleware, uploadMiddleware.array("image",10),viewHotelController.findAll);
router.put('/:id', uploadMiddleware.array("image",10),updateHotelController.updateHotel);
router.delete('/:id', uploadMiddleware.array("image",10), deleteHotelController.delete);
router.delete('/rooms/:id', uploadMiddleware.array("image",10), deleteRoomController.delete);
router.post('/rooms',adminAuthenticateMiddleware, uploadMiddleware.array("image",10), addRoomController.create);
router.get('/rooms', adminAuthenticateMiddleware, uploadMiddleware.array("image",10),viewRoomController.findAll);
router.put('/rooms/:id', uploadMiddleware.array("image",10),updateRoomController.updateRoom);
export default router;