import { NextApiRequest, NextApiResponse } from "next";
import { Transaction } from "@prisma/client";
import { authOptions } from "@api/auth/[...nextauth]";
import { createTransaction } from "@lib/db/transaction";
import { getUserEmail } from "@lib/auth";

const handle = async (req: NextApiRequest, res: NextApiResponse<Transaction>) => {
  const userEmail = await getUserEmail(req, res, authOptions);

  switch (req.method) {
    case "POST": {
      const transaction = await createTransaction(userEmail, req.body);
      res.json(transaction);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
