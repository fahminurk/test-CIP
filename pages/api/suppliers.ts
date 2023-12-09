import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const suppliers = await prisma.suplier.findMany();
    return res.status(200).send(suppliers);
  } else if (req.method == "POST") {
    const supplier = await prisma.suplier.create({
      data: {
        ...req.body,
      },
    });
    return res.status(200).send(supplier);
  } else if (req.method == "PATCH") {
    const supplier = await prisma.suplier.update({
      where: {
        id_suplier: req.body.id,
      },
      data: {
        ...req.body,
      },
    });
    return res.status(200).send(supplier);
  } else if (req.method == "DELETE") {
    console.log(req.query);

    // const supplier = await prisma.suplier.delete({
    //   where: {
    //     id_suplier: req.body.id,
    //   },
    // });
    return res.status(200).send({ message: "success" });
  }
}
