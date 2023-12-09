import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const suppliers = await prisma.suplier.findMany();
  return res.status(200).send(suppliers);
}
