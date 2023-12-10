import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { multerUpload, runMiddleware } from "@/helper/multer";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
): Promise<void> {
  const { id } = req.query;

  if (req.method == "PATCH") {
    await runMiddleware(req, res, multerUpload.single("file"));

    const file = req.file;
    const others = req.body;

    const checkProduct = await prisma.produk.findUnique({
      where: { id: Number(id) },
    });

    if (checkProduct?.foto && file) {
      try {
        fs.unlink(path.join("./public/uploads/products", checkProduct.foto));
      } catch (error) {
        console.log(error);
      }
    }

    const product = await prisma.produk.update({
      where: { id: Number(id) },
      data: {
        nama: others.nama,
        deskripsi: others.deskripsi,
        harga: Number(others.harga),
        stok: Number(others.stok),
        foto: file?.filename || checkProduct?.foto,
        suplier_id: Number(others.suplier),
      },
    });

    return res.status(200).send(product);
  } else if (req.method == "DELETE") {
    const supplier = await prisma.produk.delete({ where: { id: Number(id) } });

    if (supplier.foto) {
      try {
        fs.unlink(path.join("./public/uploads/products", supplier.foto));
      } catch (error) {
        console.log(error);
      }
    }
    return res.status(200).send(supplier);
  }
}
