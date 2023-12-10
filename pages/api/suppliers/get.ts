import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const suppliers = await prisma.suplier.findMany();
    return res.status(200).send(suppliers);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error });
  }
}
