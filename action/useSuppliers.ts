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
    queryFn: () => api.get("/suppliers/get").then((res) => res.data),
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
      return api.post("/suppliers/create", data);
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
    mutationFn: (id: number) => api.delete(`/suppliers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier deleted");
    },
  });
};

export const useEditSupplierMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      values,
      id_suplier,
    }: {
      values: { nama_suplier: string; alamat: string; email: string };
      id_suplier: number;
    }) => api.patch(`/suppliers/${id_suplier}`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Supplier updated");
    },
  });
};
