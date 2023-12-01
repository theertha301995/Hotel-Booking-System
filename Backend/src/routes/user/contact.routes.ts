import express, { Router } from 'express';
import ContactController from '../../controllers/user/contact.controller';



class contactRoutes {
  router = Router();
 
 createcontact= new ContactController();

 
  

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.use(express.json());
    this.router.post("/",this.createcontact.create);

   
   
    

    
    
  }
}

export default new contactRoutes().router;
