import type { Request, Response } from "express"
import { publisherPayloadService } from "../service/redis.service.ts"

export const createPublisherHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  await publisherPayloadService(req.body)

  res.status(200).json({ message: "success" })
}
