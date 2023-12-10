import { suplier } from "@prisma/client";

export type ProductEditModalProps = {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
  suplier: suplier;
  foto: string;
};
