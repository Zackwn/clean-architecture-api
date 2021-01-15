import { Router } from "express";
import { ProtectedRouteController } from "../../adapters/controllers/protected-route-controller";
import { withAuthAdaptRoute } from "../adapters/with-auth-express-route-adapter";

export default (router: Router) => {
  router.get('/protected-route', withAuthAdaptRoute(new ProtectedRouteController()))
}