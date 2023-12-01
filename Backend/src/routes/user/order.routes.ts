import express, { Router } from 'express';

import OrderController from '../../controllers/user/checkoutController';
import userAuthenticateMiddleware from '../../controllers/user/userAuthenticateMiddleware';
import ViewCheckout from '../../controllers/user/viewCheckOut.controller';

import OrderDelete from '../../controllers/user/deleteorder.controller';
import adminAuthenticateMiddleware from '../../controllers/admin/adminAuthenticateMiddleware';





class OrderRoutes {
  router = Router();
 
  orderget = new OrderController();
  availabilitycheck=new OrderController
  orderview = new ViewCheckout();
  singleorder=new OrderDelete()
 findalldelete= new OrderDelete()
  

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.use(express.json());
    this.router.post('/order',userAuthenticateMiddleware,this.orderget.createOrder);
    // this.router.get('/',userAuthenticateMiddleware,this.orderview.findAll);
    this.router.get('/viewcheckout',userAuthenticateMiddleware,this.orderview.findAll);
    this.router.post('/availability',userAuthenticateMiddleware,this.availabilitycheck.checkRoomAvailability);
    this.router.delete('/:id',userAuthenticateMiddleware,this.singleorder.delete);
    this.router.get('/',adminAuthenticateMiddleware,this.findalldelete.getCancelledBookings)

    
  }
}

export default new OrderRoutes().router;
