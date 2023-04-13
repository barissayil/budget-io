import type { GetServerSideProps, NextPage } from "next";
import Layout from "@components/layout";
import { Transaction } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";
import { useState } from "react";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import { Alert, Button, Loader } from "@mantine/core";
import useSWR from "swr";
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";
import useRouterAuth from "@hooks/use-router-auth";
import TransactionModalsSection from "@components/sections/transaction-modals-section";
import FilterableTransactionTable from "@components/tables/filterable-transaction-table";
import MonthPaper from "@components/papers/month-paper";

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
        <div className="flex flex-auto flex-col items-center gap-3 p-2">
          <TransactionModalsSection
            selectedTransactionId={selectedTransactionId}
            openedTransactionModal={openedTransactionModal}
            setOpenedTransactionModal={setOpenedTransactionModal}
            transactions={transactions}
            monthIndex={monthIndex}
            setSelectedTransactionId={setSelectedTransactionId}
          />
          <MonthPaper monthIndex={monthIndex} setMonthIndex={setMonthIndex} />
          <FilterableTransactionTable
            monthIndex={monthIndex}
            openEditTransactionModal={openEditTransactionModal}
            openDeleteTransactionModal={openDeleteTransactionModal}
          />
          <Button onClick={() => setOpenedTransactionModal("ADD")} color="cyan">
            Add transaction
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default Tracking;
