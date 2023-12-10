import { useProductsQuery } from "@/action/useProducts";
import ProductCard from "./productCard";

const ProductList = () => {
  const { data } = useProductsQuery();
  console.log(data);

  return (
    <div className="flex flex-col gap-2 mt-2">
      <h1 className="text-center text-xl md:text-4xl font-bold p-1 border-t">
        PRODUCT LIST
      </h1>
      <div className="flex flex-col gap-2">
        {data?.map((item, i) => <ProductCard key={i} {...item} />)}
      </div>
    </div>
  );
};

export default ProductList;
