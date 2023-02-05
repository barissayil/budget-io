import { NextApiResponse, NextApiRequest } from "next";
import { Spending } from "@prisma/client";
import { authOptions } from "@api/auth/[...nextauth]";
import { getTodaysSpendings } from "@lib/db/spendings";
import { getUserEmail } from "@lib/auth";

const handle = async (req: NextApiRequest, res: NextApiResponse<Spending[]>) => {
  const userEmail = await getUserEmail(req, res, authOptions);

  switch (req.method) {
    case "GET": {
      const spendings = await getTodaysSpendings(userEmail);
      res.json(spendings);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
