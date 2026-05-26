import type { Request, Response } from "express"
import { publisherPayloadService } from "../service/redis.service.ts"

export const createPublisherHandler = async (req: Request, res: Response) => {
  await publisherPayloadService(req.body)

  res.json({ data: "keren" })
}
