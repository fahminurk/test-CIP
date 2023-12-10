import { z } from "zod";

export const editProductSchema = z.object({
  nama: z.string().min(2, { message: "reqired" }).max(50),
  deskripsi: z.string().min(2, { message: "required" }).max(50),
  harga: z.string().min(1, { message: "required" }),
  stok: z.string().min(1, { message: "required" }),
  suplier: z.string().min(1, { message: "required" }),
});
