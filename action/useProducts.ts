import api from "@/lib/axios";
import { ProductWithSupplier } from "@/types";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useProductsQuery = (): UseQueryResult<
  ProductWithSupplier[],
  Error
> => {
  return useQuery<ProductWithSupplier[], Error>({
    queryKey: ["products"],
    queryFn: () => api.get("/products/get").then((res) => res.data),
  });
};

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return api.post("/products/post", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product added");
    },
    onError: () => {
      toast.error("Failed to add product");
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
    },
  });
};

export const useEditProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      formData,
      id,
    }: {
      formData: FormData;
      id: number;
    }) => {
      console.log("masuk");

      const res = await api.patch(`/products/${id}`, formData);
      console.log(res);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated");
    },
  });
};
