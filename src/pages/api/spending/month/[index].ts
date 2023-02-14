import { NextApiResponse, NextApiRequest } from "next";
import { Spending } from "@prisma/client";
import { authOptions } from "@api/auth/[...nextauth]";
import { getSpendingsOfMonth } from "@lib/db/spending";
import { getUserEmail } from "@lib/auth";

const handle = async (req: NextApiRequest, res: NextApiResponse<Spending[]>) => {
  const userEmail = await getUserEmail(req, res, authOptions);
  const monthIndex = Number(req.query.index);

  switch (req.method) {
    case "GET": {
      const spendings = await getSpendingsOfMonth(userEmail, monthIndex);
      res.json(spendings);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;