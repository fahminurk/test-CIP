import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id_supplier } = req.query;

  if (req.method == "PATCH") {
    try {
      const supplier = await prisma.suplier.update({
        where: { id_suplier: Number(id_supplier) },
        data: { ...req.body },
      });

      return res.status(200).send(supplier);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Internal Server Error", error: error });
    }
  } else if (req.method == "DELETE") {
    try {
      const supplier = await prisma.suplier.delete({
        where: { id_suplier: Number(id_supplier) },
      });
      return res.status(200).send(supplier);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Internal Server Error", error: error });
    }
  }
}
