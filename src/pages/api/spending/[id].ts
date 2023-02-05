import { NextApiResponse, NextApiRequest } from "next";
import { Spending } from "@prisma/client";
import { authOptions } from "@api/auth/[...nextauth]";
import { deleteSpending, updateSpending } from "@lib/db/spending";
import { getUserEmail } from "@lib/auth";

const handle = async (req: NextApiRequest, res: NextApiResponse<Spending>) => {
  const userEmail = await getUserEmail(req, res, authOptions);
  const id = req.query.id as string;

  switch (req.method) {
    case "DELETE": {
      const spending = await deleteSpending(id, userEmail);
      res.json(spending);
      break;
    }
    case "PUT": {
      const spending = await updateSpending(id, userEmail, req.body);
      res.json(spending);
      break;
    }
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
