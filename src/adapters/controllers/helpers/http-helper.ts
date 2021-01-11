import { ServerError } from "../errors/server-error"
import { HttpResponse } from "../ports/http"

const BAD_REQUEST_STATUS_CODE = 400
const OK_STATUS_CODE = 200
const SERVER_ERROR_STATUS_CODE = 500

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: BAD_REQUEST_STATUS_CODE,
    body: error.message
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: OK_STATUS_CODE,
    body: data
  }
}

export const serverError = (reason: string): HttpResponse => {
  return {
    statusCode: SERVER_ERROR_STATUS_CODE,
    body: new ServerError(reason)
  }
}