import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeLoginController } from "../factories/login";
import { makeRegisterController } from "../factories/register";

export default (router: Router) => {
  router.post('/signup', adaptRoute(makeRegisterController()))
  router.post('/signin', adaptRoute(makeLoginController()))
}