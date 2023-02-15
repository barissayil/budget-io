import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@api/auth/[...nextauth]";
import { getSpendingSubcategories } from "@lib/db/spending";
import { getUserEmail } from "@lib/auth";

const handle = async (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  const userEmail = await getUserEmail(req, res, authOptions);
  const category = req.query.category as string;

  switch (req.method) {
    case "GET": {
      const subcategories = await getSpendingSubcategories(category, userEmail);
      res.json(subcategories);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
