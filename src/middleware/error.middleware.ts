import { type Request, type Response, type NextFunction } from "express"
import { logger } from "../utils/logger.ts"
import { HttpException } from "../utils/errors/http.exception.ts"
import type { IResponseMessage } from "../utils/types/interface/IResponse.interface.ts"

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  let status = 500
  let message = "Internal Server Error"

  if (err instanceof HttpException) {
    status = err.statusCode
    message = err.message
  } else if (err && typeof err === "object" && "message" in err) {
    // generic error-like objects
    // @ts-ignore
    message = err.message ?? message
    // @ts-ignore
    status = err.statusCode ?? status
  }

  logger.error(
    typeof err === "object" && err
      ? ((err as any).stack ?? JSON.stringify(err))
      : String(err),
  )

  const response: IResponseMessage = {
    code: status,
    status: false,
    message,
  }

  res.status(status).json(response)
}

export default errorMiddleware
