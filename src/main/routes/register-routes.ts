import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeRegisterController } from "../factories/register";

export default (router: Router) => {
  router.post('/register', adaptRoute(makeRegisterController()))
}