import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Params = {
  isProtected: boolean;
};

const useRouterAuth = ({ isProtected }: Params) => {
  const { status } = useSession();
  const router = useRouter();

  const statusToCheck = isProtected ? "unauthenticated" : "authenticated";
  const routeToRedirect = isProtected ? "/" : "/tracking";

  useEffect(() => {
    if (status === statusToCheck) router.push(routeToRedirect);
  }, [routeToRedirect, router, status, statusToCheck]);

  return { status, router };
};

export default useRouterAuth;
