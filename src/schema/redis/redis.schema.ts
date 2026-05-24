import { z } from "zod"

export const createRedishSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.email("Format email tidak valid"),
    age: z.number().int().positive("Umur harus angka positif").optional(),
  }),
})
