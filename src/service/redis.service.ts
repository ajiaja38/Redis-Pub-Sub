import { pubClient, subClient } from "../config/redis.config.ts"
import type { IPayloadRedis } from "../interface/payload.interface"
import { logger } from "../utils/logger.ts"

export const publisherPayloadService = async (
  payload: IPayloadRedis,
): Promise<void> => {
  try {
    const channelName: string = "publisher/redis"
    const message: string = JSON.stringify(payload)

    pubClient.publish(channelName, message)
  } catch (error) {
    logger.error(error)
  }
}

export const subscriberPayloadService = async (): Promise<void> => {
  try {
    subClient.subscribe("publisher/redis", (message) => {
      const data: IPayloadRedis = JSON.parse(message)

      console.log("Data Dari Redis: ", data)
    })
  } catch (error) {
    logger.error(error)
  }
}
