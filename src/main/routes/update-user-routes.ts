import { Router } from "express";
import { withAuthAdaptRoute } from "../adapters/with-auth-express-route-adapter";
import { makeUpdateUserName } from '../factories/update-user-name'

export default (router: Router) => {
  router.patch('/user/edit/name', withAuthAdaptRoute(makeUpdateUserName()))
}