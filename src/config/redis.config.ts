import { createClient } from "redis"
import { logger } from "../utils/logger.ts"
import { subscriberPayloadService } from "../service/redis.service.ts"

const redisConfig = {
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT as unknown as number,
  },
}

export const pubClient = createClient(redisConfig)
export const subClient = createClient(redisConfig)

pubClient.on("error", (err) =>
  logger.error("Redis Publsiher Client Error", err),
)

subClient.on("error", (err) =>
  logger.error("Redis Subscriber Client Error", err),
)

export const startRedis = async (): Promise<void> => {
  try {
    await Promise.all([pubClient.connect(), subClient.connect()])
    logger.info("success connect redis server")
  } catch (error) {
    logger.error("❌ Gagal menyalakan server karena Redis error:", error)
    process.exit(1)
  }
}

export const redisSubsciberFunc = async (): Promise<void> => {
  await subscriberPayloadService()
}
