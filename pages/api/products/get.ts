import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products = await prisma.produk.findMany({
      include: {
        suplier: true,
      },
    });

    return res.status(200).send(products);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error });
  }
}
