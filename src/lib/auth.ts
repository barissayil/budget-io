import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions, getServerSession } from "next-auth";

export const getUserEmail = async (
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: NextAuthOptions
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) throw new Error(`Unauthorized.`);

  const userEmail = session.user?.email;
  if (!userEmail) throw new Error(`User does not exist or has no email.`);
  return userEmail;
};
