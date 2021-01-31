import { Response, Request } from 'express'
import { unauthrozied } from '../../adapters/controllers/helpers/http-helper'
import { WithAuthParams } from '../../adapters/controllers/ports/auth'
import { HttpRequest } from '../../adapters/controllers/ports/http'
import { WithAuthController } from '../../adapters/controllers/with-auth-controller'
import { UserAuthPayload } from '../../usecases/ports/user-auth'
import { makeUserAuth } from '../factories/user-auth'

const unauthorizedError = (res: Response) => {
  const { statusCode } = unauthrozied()
  res.status(statusCode).send()
}

export const ensureAuthAdaptRoute = (withAuthController: WithAuthController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    }

    const token = req.headers.authorization

    if (!token) {
      unauthorizedError(res)
      return
    }

    const userAuth = makeUserAuth()

    const payloadOrError = await userAuth.decode(token)

    if (payloadOrError.isLeft()) {
      unauthorizedError(res)
      return
    }

    const payload: UserAuthPayload = payloadOrError.value

    const userAuthParams: WithAuthParams = {
      payload,
      token
    }

    const httpResponse = await withAuthController.handle(httpRequest, userAuthParams)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}