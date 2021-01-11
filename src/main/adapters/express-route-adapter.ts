import { Response, Request } from 'express'
import { Controller } from '../../adapters/controllers/controller'
import { HttpRequest } from '../../adapters/controllers/ports/http'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}