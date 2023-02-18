import { NextApiResponse, NextApiRequest } from "next";
import { Transaction } from "@prisma/client";
import { authOptions } from "@api/auth/[...nextauth]";
import { deleteTransaction, updateTransaction } from "@lib/db/transaction";
import { getUserEmail } from "@lib/auth";

const handle = async (req: NextApiRequest, res: NextApiResponse<Transaction>) => {
  const userEmail = await getUserEmail(req, res, authOptions);
  const id = req.query.id as string;

  switch (req.method) {
    case "DELETE": {
      const transaction = await deleteTransaction(id, userEmail);
      res.json(transaction);
      break;
    }
    case "PUT": {
      const transaction = await updateTransaction(id, userEmail, req.body);
      res.json(transaction);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
