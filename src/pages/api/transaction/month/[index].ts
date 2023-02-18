import { NextApiResponse, NextApiRequest } from "next";
import { Transaction } from "@prisma/client";
import { authOptions } from "@api/auth/[...nextauth]";
import { getTransactionsOfMonth } from "@lib/db/transaction";
import { getUserEmail } from "@lib/auth";

const handle = async (req: NextApiRequest, res: NextApiResponse<Transaction[]>) => {
  const userEmail = await getUserEmail(req, res, authOptions);
  const monthIndex = Number(req.query.index);

  switch (req.method) {
    case "GET": {
      const transaction = await getTransactionsOfMonth(userEmail, monthIndex);
      res.json(transaction);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
