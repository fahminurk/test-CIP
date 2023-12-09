import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  const { id_supplier } = req.query;

  if (req.method == "PATCH") {
    const supplier = await prisma.suplier.update({
      where: {
        id_suplier: Number(id_supplier),
      },
      data: {
        ...req.body,
      },
    });

    return res.status(200).send(supplier);
  } else if (req.method == "DELETE") {
    const supplier = await prisma.suplier.delete({
      where: {
        id_suplier: Number(id_supplier),
      },
    });
    return res.status(200).send(supplier);
  }
}
