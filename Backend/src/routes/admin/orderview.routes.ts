import { Router } from 'express';
import adminSignIn from '../../controllers/admin/signin.controller';
import ViewAdmins from '../../controllers/admin/viewAdmins.controller';
import adminAuthenticateMiddleware from '../../controllers/admin/adminAuthenticateMiddleware';
import ViewBooking from '../../controllers/admin/viewBooking.controller';



class AdminOrderRoutes {
  router = Router();
  OrderAdminController = new ViewBooking();

  

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get('/',adminAuthenticateMiddleware, this.OrderAdminController.findAll);

    
    
  }
}

export default new AdminOrderRoutes().router;
