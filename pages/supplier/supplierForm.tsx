import React, { useState } from "react";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useAddSupplierMutation } from "@/action/useSuppliers";
import { addSupplierSchema } from "@/helper/schema";

const SupplierForm = () => {
  const { mutateAsync, isPending } = useAddSupplierMutation();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addSupplierSchema>>({
    resolver: zodResolver(addSupplierSchema),
    defaultValues: {
      nama_suplier: "",
      alamat: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addSupplierSchema>) {
    try {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        className="w-full"
        variant={"outline"}
        onClick={() => setOpen(!open)}
      >
        Add Supplier
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5 text-xl font-bold">
            ADD SUPPLIER
          </DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="nama_suplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>nama supplier</FormLabel>
                      <FormControl>
                        <Input placeholder="nama" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>alamat</FormLabel>
                      <FormControl>
                        <Input placeholder="alamat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierForm;
