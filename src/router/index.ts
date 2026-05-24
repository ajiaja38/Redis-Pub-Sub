import express from "express"
import redisRouter from "./redis.router.ts"

export const router: express.Router = express.Router()

router.use("/redis", redisRouter)
