import React, { ChangeEventHandler, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAddProductMutation } from "@/action/useProducts";
import { useSupplierQuery } from "@/action/useSuppliers";
import { addProductSchema } from "@/helper/schema";

const ProductForm = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutateAsync, isPending } = useAddProductMutation();
  const { data: suppliers } = useSupplierQuery();

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      nama: "",
      deskripsi: "",
      harga: "",
      stok: "",
      suplier: "",
    },
  });

  const handleInputProfilePictureChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const MAX_SIZE = 2 * 1024 * 1024;

    if (event.target.files?.length) {
      if (event.target.files[0].size > MAX_SIZE) {
        event.target.value = "";
        return toast.error("Batas file size 2 MB");
      }

      setSelectedFile(event.target.files[0]);
    }
  };

  async function onSubmit(values: z.infer<typeof addProductSchema>) {
    try {
      if (!selectedFile) {
        return toast.error("Please select a file");
      }
      const formData = new FormData();
      formData.append("nama", values.nama);
      formData.append("deskripsi", values.deskripsi);
      formData.append("harga", values.harga);
      formData.append("stok", values.stok);
      formData.append("suplier", values.suplier);
      formData.append("file", selectedFile as Blob);

      await mutateAsync(formData);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          className="w-full bg-white"
          variant={"outline"}
          onClick={() => setOpen(!open)}
        >
          Add Product
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5 text-xl font-bold">
              ADD PRODUCTS
            </DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>nama</FormLabel>
                      <FormControl>
                        <Input placeholder="nama" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>deskripsi</FormLabel>
                      <FormControl>
                        <Input placeholder="deskripsi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="harga"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>harga</FormLabel>
                      <FormControl>
                        <Input placeholder="harga" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>stok</FormLabel>
                      <FormControl>
                        <Input placeholder="stok" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="suplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>suplier</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="select suplier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          {suppliers?.map((item) => (
                            <SelectItem
                              key={item.id_suplier}
                              value={item.id_suplier.toString()}
                            >
                              {item.nama_suplier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Input
                  onChange={handleInputProfilePictureChange}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className=""
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductForm;
