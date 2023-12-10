import React from "react";
import SupplierDeleteModal from "./supplierDeleteModal";
import SupplierEditModal from "./supplierEditModal";

interface SupplierCardProps {
  id_suplier: number;
  nama_suplier: string;
  alamat: string;
  email: string;
}

const SupplierCard: React.FC<SupplierCardProps> = ({
  id_suplier,
  nama_suplier,
  alamat,
  email,
}) => {
  return (
    <div
      key={id_suplier}
      className="p-2 rounded-lg border shadow-md flex flex-col gap-2"
    >
      <div className="flex">
        <div className="font-bold">
          <p className="border-b">nama</p>
          <p className="border-b">alamat</p>
          <p className="border-b">email</p>
        </div>
        <div className="font-bold w-2 text-center">
          <p className="border-b">:</p>
          <p className="border-b">:</p>
          <p className="border-b">:</p>
        </div>
        <div className="flex-1">
          <p className="border-b">{nama_suplier}</p>
          <p className="border-b">{alamat}</p>
          <p className="border-b">{email}</p>
        </div>
      </div>
      <div className="flex justify-end gap-1">
        <SupplierEditModal
          id_suplier={id_suplier}
          nama_suplier={nama_suplier}
          alamat={alamat}
          email={email}
        />
        <SupplierDeleteModal id_suplier={id_suplier} />
      </div>
    </div>
  );
};

export default SupplierCard;
