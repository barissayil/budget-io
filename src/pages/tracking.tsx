import type { GetServerSideProps, NextPage } from "next";
import Layout from "@components/layout";
import { Transaction } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";
import ModifiableTransactionTable from "@components/tracking/modifiable-transaction-table";
import { useState } from "react";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import { Alert, Loader, Title } from "@mantine/core";
import useSWR from "swr";
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";
import useRouterAuth from "@hooks/use-router-auth";
import dayjs from "dayjs";
import TransactionModals from "@components/tracking/transaction-modals";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Tracking: NextPage = () => {
  const { status } = useRouterAuth({ isProtected: true });
  const [monthIndex, setMonthIndex] = useState<number>(0);
  const { data: transactions, error } = useSWR<Transaction[], Error>(
    `/api/transaction/month/${monthIndex}`
  );
  const [openedTransactionModal, setOpenedTransactionModal] =
    useState<OpenedTransactionModal>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  const openEditTransactionModal = (id: string) => {
    setSelectedTransactionId(id);
    setOpenedTransactionModal("EDIT");
  };

  const openDeleteTransactionModal = (id: string) => {
    setSelectedTransactionId(id);
    setOpenedTransactionModal("DELETE");
  };

  return (
    <Layout>
      {status === "loading" && !error && (
        <div className="m-10 self-center">
          <Loader />
        </div>
      )}
      {error && (
        <Alert icon={<AlertCircleIcon size={16} />} title={error.name} color="red">
          {error.message}
        </Alert>
      )}
      {status === "authenticated" && !error && (
        <div className="flex flex-auto flex-col items-center">
          <TransactionModals
            selectedTransactionId={selectedTransactionId}
            openedTransactionModal={openedTransactionModal}
            setOpenedTransactionModal={setOpenedTransactionModal}
            transactions={transactions}
            monthIndex={monthIndex}
            setSelectedTransactionId={setSelectedTransactionId}
          />
          <Title className="m-5" order={1}>
            {dayjs().subtract(monthIndex, "months").format("MMMM YYYY")}
          </Title>
          <ModifiableTransactionTable
            monthIndex={monthIndex}
            setMonthIndex={setMonthIndex}
            setOpenedTransactionModal={setOpenedTransactionModal}
            openEditTransactionModal={openEditTransactionModal}
            openDeleteTransactionModal={openDeleteTransactionModal}
          />
        </div>
      )}
    </Layout>
  );
};

export default Tracking;
