import type { GetServerSideProps, NextPage } from "next";
import Layout from "@components/layout";
import { Transaction } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";
import ModifiableTransactionTable from "@components/tracking/modifiable-transaction-table";
import { useState } from "react";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import AddTransactionModal from "@components/tracking/modals/add-transaction-modal";
import DeleteTransactionModal from "@components/tracking/modals/delete-transaction-modal";
import EditTransactionModal from "@components/tracking/modals/edit-transaction-modal";
import { Alert, Loader, Title } from "@mantine/core";
import useSWR from "swr";
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";
import useRouterAuth from "@hooks/use-router-auth";
import dayjs from "dayjs";

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

  const getTransaction = (id: string): Transaction => {
    return (transactions as Transaction[]).find(
      (transaction) => transaction.id === id
    ) as Transaction;
  };

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
      {openedTransactionModal === "ADD" && (
        <AddTransactionModal
          setOpenedTransactionModal={setOpenedTransactionModal}
          transactions={transactions as Transaction[]}
          monthIndex={monthIndex}
        />
      )}
      {openedTransactionModal === "EDIT" && (
        <EditTransactionModal
          transactionToUpdate={getTransaction(selectedTransactionId as string)}
          setOpenedTransactionModal={setOpenedTransactionModal}
          transactions={transactions as Transaction[]}
          monthIndex={monthIndex}
          setSelectedTransactionId={setSelectedTransactionId}
        />
      )}
      {openedTransactionModal === "DELETE" && (
        <DeleteTransactionModal
          transactionIdToDelete={selectedTransactionId as string}
          setOpenedTransactionModal={setOpenedTransactionModal}
          transactions={transactions as Transaction[]}
          monthIndex={monthIndex}
          setSelectedTransactionId={setSelectedTransactionId}
        />
      )}
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
