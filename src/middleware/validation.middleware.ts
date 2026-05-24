import { type Request, type Response, type NextFunction } from "express"
import { ZodError, type ZodSchema } from "zod" // 1. Ubah ke ZodSchema

export const validate =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        console.log(errorMessages)

        res.status(400).json({
          status: "error",
          message: errorMessages,
          errors: errorMessages,
        })
        return
      }
      next(error)
    }
  }
