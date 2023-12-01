import express, { Router } from 'express';

import userAuthenticateMiddleware from '../../controllers/user/userAuthenticateMiddleware';
import UserHotelsView from '../../controllers/user/viewhotels.controller';
import { uploadMiddleware } from '../../controllers/admin/uploadMiddleware';



class userhotelRoutes {
  router = Router();
 
  findAllHotels= new UserHotelsView();

 
  

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.use(express.json());
    this.router.get("/",uploadMiddleware.array('image',10),this.findAllHotels.findAll);

   
   
    

    
    
  }
}

export default new userhotelRoutes().router;
