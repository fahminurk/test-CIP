import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import prisma from "@/lib/prisma";

import { multerUpload, runMiddleware } from "@/helper/multer";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
): Promise<void> => {
  await runMiddleware(req, res, multerUpload.single("file"));
  const file = req.file;
  const others = req.body;

  const product = await prisma.produk.create({
    data: {
      nama: others.nama,
      deskripsi: others.deskripsi,
      harga: Number(others.harga),
      stok: Number(others.stok),
      foto: file.filename,
      suplier_id: Number(others.suplier),
    },
  });

  res.status(200).send(product);
};

export default handler;
