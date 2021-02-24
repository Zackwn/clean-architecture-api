import { Router } from "express";
import { ensureAuthAdaptRoute } from "../adapters/with-auth-express-route-adapter";
import { makeCreatePostController } from "../factories/controllers/create-post-controller";

export default (router: Router) => {
  router.post('/post/create', ensureAuthAdaptRoute(makeCreatePostController()))
}