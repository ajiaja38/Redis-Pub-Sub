import express, { type Express, type Response } from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import { logger } from "./src/utils/logger.ts"
import type { IResponseMessage } from "./src/utils/types/interface/IResponse.interface.ts"
import { router } from "./src/router/index.ts"
import { redisSubsciberFunc, startRedis } from "./src/config/redis.config.ts"
import errorMiddleware from "./src/middleware/error.middleware.ts"
dotenv.config()

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000
const appRouter: express.Router = router

app.use(morgan("common"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

appRouter.get("/", (_, res: Response) => {
  const response: IResponseMessage = {
    code: 200,
    status: true,
    message: "Hello From Express",
  }

  res.status(200).send(response)
})

app.use("/api/v1", appRouter)

app.use(errorMiddleware)

startRedis()
redisSubsciberFunc()

app.listen(port, () => {
  logger.info(`🚀 Server running on http://localhost:${port}/api/v1`)
})
