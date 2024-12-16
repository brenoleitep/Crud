import { HttpResponse, HttpStatusCode } from "./protocols"

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body: body
})

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.Created,
  body: body
})

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BadRequest,
    body: message,
  }
}

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.InternalServerError,
    body: "Something went wrong",
  }
}
