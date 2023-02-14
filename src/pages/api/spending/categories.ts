import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@api/auth/[...nextauth]";
import { getSpendingCategories } from "@lib/db/spending";
import { getUserEmail } from "@lib/auth";

const handle = async (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  const userEmail = await getUserEmail(req, res, authOptions);

  switch (req.method) {
    case "GET": {
      const categories = await getSpendingCategories(userEmail);
      res.json(categories);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
