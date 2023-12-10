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

export type ProductWithSupplier = {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
  foto: string;
  suplier_id: number;
  suplier: suplier;
};

export type SupplierCardProps = {
  id_suplier: number;
  nama_suplier: string;
  alamat: string;
  email: string;
};

export type SupplierEditProps = {
  id_suplier: number;
  nama_suplier: string;
  alamat: string;
  email: string;
};
