import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supplier = await prisma.suplier.create({
    data: {
      ...req.body,
    },
  });

  return res.status(200).send(supplier);
}
