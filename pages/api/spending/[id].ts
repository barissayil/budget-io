import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "prisma/client";

const handleDelete = async (id: number, res: NextApiResponse) => {
  const spending = await prisma.spending.delete({
    where: { id },
  });
  res.json(spending);
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  await handleDelete(Number(req.query.id), res);
};

export default handle;