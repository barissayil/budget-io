import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "prisma/client";

type Body = {
  date: string;
  amount: number;
  category: string;
};

const handleDelete = async (id: number, res: NextApiResponse) => {
  const spending = await prisma.spending.delete({
    where: { id },
  });
  res.json(spending);
};

const handlePut = async (
  id: number,
  { date, amount, category }: Body,
  res: NextApiResponse
) => {
  const spending = await prisma.spending.update({
    where: { id },
    data: { date, amount, category },
  });
  res.json(spending);
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = Number(req.query.id);
  if (req.method === "DELETE") await handleDelete(id, res);
  if (req.method === "PUT") await handlePut(id, req.body, res);
};

export default handle;
