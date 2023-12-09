import api from "@/lib/axios";
import { suplier } from "@prisma/client";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useSupplierQuery = (): UseQueryResult<suplier[], Error> => {
  return useQuery<suplier[], Error>({
    queryKey: ["suppliers"],
    queryFn: () => api.get("/suppliers").then((res) => res.data),
  });
};

export const useAddSupplierMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      nama_suplier: string;
      alamat: string;
      email: string;
    }) => {
      return api.post("/suppliers", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier added");
    },
  });
};

export const useDeleteSupplierMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return api.delete(`/suppliers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier deleted");
    },
  });
};
