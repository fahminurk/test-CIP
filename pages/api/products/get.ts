import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await prisma.produk.findMany({
    include: {
      suplier: true,
    },
  });

  return res.status(200).send(products);
}
