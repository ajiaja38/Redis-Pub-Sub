import express from "express"
import { validate } from "../middleware/validation.middleware.ts"
import { createRedishSchema } from "../schema/redis/redis.schema.ts"
import { createPublisherHandler } from "../controller/redis.controller.ts"

const redisRouter: express.Router = express.Router()

redisRouter.post(
  "/create",
  validate(createRedishSchema),
  createPublisherHandler,
)

export default redisRouter
