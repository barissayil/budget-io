import { NextApiResponse, NextApiRequest } from "next";
import { Spending } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";
import { getThisYearsSpendings } from "@lib/db/spendings";

const handleGet = async (userEmail: string, res: NextApiResponse<Spending[]>) => {
  const spendings = await getThisYearsSpendings(userEmail);
  res.json(spendings);
};

const handle = async (req: NextApiRequest, res: NextApiResponse<Spending[]>) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) throw new Error(`Unauthorized.`);

  const userEmail = session.user?.email;
  if (!userEmail) throw new Error(`User does not exist or has no email.`);

  switch (req.method) {
    case "GET":
      await handleGet(userEmail, res);
      break;
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
