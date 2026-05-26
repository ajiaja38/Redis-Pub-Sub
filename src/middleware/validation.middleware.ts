import { type Request, type Response, type NextFunction } from "express"
import { ZodError, type ZodSchema } from "zod"
import { BadRequestException } from "../utils/errors/http.exception.ts"

export const validate =
  (schema: ZodSchema) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.message
        return next(
          new BadRequestException(errorMessages || "Validation failed"),
        )
      }
      next(error)
    }
  }
