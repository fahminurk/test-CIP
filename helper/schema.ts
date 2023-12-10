import { z } from "zod";

export const editProductSchema = z.object({
  nama: z.string().min(2, { message: "reqired" }).max(50),
  deskripsi: z.string().min(2, { message: "required" }).max(50),
  harga: z.string().min(1, { message: "required" }),
  stok: z.string().min(1, { message: "required" }),
  suplier: z.string().min(1, { message: "required" }),
});

export const addProductSchema = z.object({
  nama: z.string().min(2, { message: "reqired" }).max(50),
  deskripsi: z.string().min(2, { message: "required" }).max(50),
  harga: z.string().min(1, { message: "required" }).max(1000000),
  stok: z.string().min(1, { message: "required" }).max(100),
  suplier: z.string().min(1, { message: "required" }),
});

export const editSupplierSchema = z.object({
  nama_suplier: z.string().min(2).max(50),
  alamat: z.string().min(2).max(50),
  email: z.string().email(),
});

export const addSupplierSchema = z.object({
  nama_suplier: z.string().min(2).max(50),
  alamat: z.string().min(2).max(50),
  email: z.string().email(),
});
