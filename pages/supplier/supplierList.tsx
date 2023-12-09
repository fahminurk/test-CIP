import { useSupplierQuery } from "@/action/useSuppliers";
import SupplierCard from "./supplierCard";

const SupplierList = () => {
  const { data } = useSupplierQuery();
  console.log(data);

  return (
    <div className="flex flex-col gap-2 mt-2">
      <h1 className="text-center text-xl md:text-4xl font-bold p-1 border-t">
        SUPPLIER LIST
      </h1>
      <div className="flex flex-col gap-2">
        {data?.map((item, i) => <SupplierCard key={i} {...item} />)}
      </div>
    </div>
  );
};

export default SupplierList;
