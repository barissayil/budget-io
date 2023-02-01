import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/prisma";
import { Spending } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";

type Body = {
  date: string;
  amount: number;
  category: string;
};

const handlePost = async (
  { date, amount, category }: Body,
  userEmail: string,
  res: NextApiResponse<Spending>
) => {
  const spending = await prisma.spending.create({
    data: {
      date,
      amount,
      category,
      user: { connect: { email: userEmail } },
    },
  });
  res.json(spending);
};

export default async function handle(req: NextApiRequest, res: NextApiResponse<Spending>) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) throw new Error(`Unauthorized.`);

  const userEmail = session.user?.email;
  if (!userEmail) throw new Error(`User does not exist or has no email.`);

  switch (req.method) {
    case "POST":
      await handlePost(req.body, userEmail, res);
      break;
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
