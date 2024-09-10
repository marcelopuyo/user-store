import { Router } from 'express';
import { AuthController } from './controller';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const controller = new AuthController();
    
    // Definir las rutas
    router.post('/login', /*TodoRoutes.routes */ );
    router.post('/register', /*TodoRoutes.routes */ );

    router.get('/validate-email/:token', /*TodoRoutes.routes */ );



    return router;
  }


}

