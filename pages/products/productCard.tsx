import React from "react";
import Image from "next/image";
import ProductDeleteModal from "./productDeleteModal";
import ProductEditModal from "./productEditModal";
import { ProductWithSupplier } from "@/types";

const ProductCard: React.FC<ProductWithSupplier> = ({
  id,
  nama,
  deskripsi,
  harga,
  stok,
  foto,
  suplier,
}) => {
  return (
    <div
      key={id}
      className="p-2 rounded-lg border shadow-md flex flex-col gap-2"
    >
      <div className="flex flex-col items-center sm:flex-row sm:items-start">
        <Image
          src={`/uploads/products/${foto}`}
          width={200}
          height={150}
          alt="image"
          className="sm:w-1/3 object-cover mr-1 max-h-52 h-screen"
        />
        <div className="flex flex-1 w-full">
          <div className="font-bold">
            <p className="border-b">nama</p>
            <p className="border-b">deskripsi</p>
            <p className="border-b">harga</p>
            <p className="border-b">stok</p>
            <p className="border-b">suplier</p>
            <p className="border-b">email</p>
            <p className="border-b">alamat</p>
          </div>
          <div className="font-bold w-2 text-center">
            {Array.from({ length: 7 }).map((_, i) => (
              <p className="border-b" key={i}>
                :
              </p>
            ))}
          </div>
          <div className="flex-1">
            <p className="border-b">{nama}</p>
            <p className="border-b">{deskripsi}</p>
            <p className="border-b">{harga}</p>
            <p className="border-b">{stok}</p>
            <p className="border-b">{suplier.nama_suplier}</p>
            <p className="border-b">{suplier.email}</p>
            <p className="border-b">{suplier.alamat}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-1">
        <ProductEditModal
          id={id}
          nama={nama}
          deskripsi={deskripsi}
          harga={harga}
          stok={stok}
          suplier={suplier}
          foto={foto}
        />
        <ProductDeleteModal id={id} />
      </div>
    </div>
  );
};

export default ProductCard;
