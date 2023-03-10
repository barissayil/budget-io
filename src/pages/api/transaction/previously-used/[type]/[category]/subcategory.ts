import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@api/auth/[...nextauth]";
import { getSubcategories } from "@lib/db/transaction";
import { getUserEmail } from "@lib/auth";
import { TransactionType } from "@prisma/client";

const handle = async (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  const userEmail = await getUserEmail(req, res, authOptions);
  const type = req.query.type as TransactionType;
  const category = req.query.category as string;

  switch (req.method) {
    case "GET": {
      const subcategories = await getSubcategories(userEmail, type, category);
      res.json(subcategories);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
