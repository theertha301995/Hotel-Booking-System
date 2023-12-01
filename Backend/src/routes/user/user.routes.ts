import express, { Router } from 'express';
import UserReg from '../../controllers/user/userSignUp.controller';
import UserSignIn from '../../controllers/user/userSignIn.controller';
import adminAuthenticateMiddleware from '../../controllers/admin/adminAuthenticateMiddleware';
import HotelSearch from '../../controllers/user/search.controller';
import ViewSinglItem from '../../controllers/user/viewSingleItem.controller';
import CartController from '../../controllers/user/addtoCart.controller';
import ViewCart from '../../controllers/user/viewcart.controller';
import userAuthenticateMiddleware from '../../controllers/user/userAuthenticateMiddleware';
import UserHotelsView from '../../controllers/user/viewhotels.controller';

// import getBookedHotelDetails from '../../controllers/user/viewBookingId.controller';
// import viewBookingId from '../../controllers/user/viewBookingId.controller';
// import GetBookingController from '../../controllers/user/viewBookingId.controller';



class UserRoutes {
  router = Router();
  userRegController = new UserReg();
  userLoginController=new UserSignIn()
  userSearchController=new HotelSearch();
  userViewController=new ViewSinglItem();
  
 
  

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.use(express.json());
    this.router.post('/register', this.userRegController.create);
    this.router.post('/login', this.userLoginController.login);
    this.router.get('/', this.userSearchController.searchHotels);
    this.router.get("/:id",userAuthenticateMiddleware,this.userViewController.getHotelById);
   
    
    

    
    
  }
}

export default new UserRoutes().router;
