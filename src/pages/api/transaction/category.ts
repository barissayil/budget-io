import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@api/auth/[...nextauth]";
import { getCategories } from "@lib/db/transaction";
import { getUserEmail } from "@lib/auth";
import { TransactionType } from "@prisma/client";

const handle = async (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  const userEmail = await getUserEmail(req, res, authOptions);

  switch (req.method) {
    case "GET": {
      const categories = await getCategories(userEmail, TransactionType.SPENDING);
      res.json(categories);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
