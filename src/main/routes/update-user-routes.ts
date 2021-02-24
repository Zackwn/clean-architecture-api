import { Router } from "express";
import { ensureAuthAdaptRoute } from "../adapters/with-auth-express-route-adapter";
import { makeUpdateUserName } from '../factories/controllers/update-user-name'

export default (router: Router) => {
  router.patch('/user/edit/name', ensureAuthAdaptRoute(makeUpdateUserName()))
}