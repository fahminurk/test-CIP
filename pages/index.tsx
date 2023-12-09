import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductForm from "./products/productForm";
import SupplierForm from "./supplier/supplierForm";
import SupplierList from "./supplier/supplierList";

export default function App() {
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="products" className="w-full max-w-2xl p-4">
        <TabsList className="grid w-full grid-cols-2 gap-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="supplier">supplier</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductForm />
        </TabsContent>
        <TabsContent value="supplier">
          <SupplierForm />
          <SupplierList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
