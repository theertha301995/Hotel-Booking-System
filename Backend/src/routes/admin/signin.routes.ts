import { Router } from 'express';
import adminSignIn from '../../controllers/admin/signin.controller';
import ViewAdmins from '../../controllers/admin/viewAdmins.controller';
import adminAuthenticateMiddleware from '../../controllers/admin/adminAuthenticateMiddleware';



class SignInRoutes {
  router = Router();
  signInController = new adminSignIn();
  viewAdminsController = new ViewAdmins();
  

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    
    this.router.post('/', this.signInController.login);
    this.router.get('/usernames',adminAuthenticateMiddleware, this.viewAdminsController.findAll);

    
    
  }
}

export default new SignInRoutes().router;
