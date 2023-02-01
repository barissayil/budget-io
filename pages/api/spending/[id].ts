import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@db/prisma";
import { Spending } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";

type Body = {
  date: string;
  amount: number;
  category: string;
};

const handleDelete = async (id: string, userEmail: string, res: NextApiResponse<Spending>) => {
  const spending = await prisma.spending.delete({
    where: {
      id_userEmail: {
        id,
        userEmail,
      },
    },
  });
  res.json(spending);
};

const handlePut = async (
  id: string,
  userEmail: string,
  { date, amount, category }: Body,
  res: NextApiResponse<Spending>
) => {
  const spending = await prisma.spending.update({
    where: {
      id_userEmail: {
        id,
        userEmail,
      },
    },
    data: { date, amount, category },
  });
  res.json(spending);
};

const handle = async (req: NextApiRequest, res: NextApiResponse<Spending>) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) throw new Error(`Unauthorized.`);

  const userEmail = session.user?.email;
  if (!userEmail) throw new Error(`User does not exist or has no email.`);

  switch (req.method) {
    case "DELETE":
      await handleDelete(req.query.id as string, userEmail, res);
      break;
    case "PUT":
      await handlePut(req.query.id as string, userEmail, req.body, res);
      break;
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
