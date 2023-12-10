import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteProductMutation } from "@/action/useProducts";

const ProductDeleteModal: React.FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteProductMutation();

  const deleteSupplier = async () => {
    try {
      await mutateAsync(id);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size={"sm"}
        variant={"destructive"}
        onClick={() => setOpen(!open)}
      >
        Delete
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure want delete {id} ?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={deleteSupplier}
            disabled={isPending}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeleteModal;
