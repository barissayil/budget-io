import type { GetServerSideProps, NextPage } from "next";
import Layout from "@components/layout";
import { prisma } from "@db/prisma";
import { Spending } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import ModifiableSpendingTable from "@components/modifiable-spending-table";
import { useState } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { useSession } from "next-auth/react";
import AddSpendingModal from "@components/modals/add-spending-modal";
import DeleteSpendingModal from "@components/modals/delete-spending-modal";
import EditSpendingModal from "@components/modals/edit-spending-modal";
import { Flex, Loader } from "@mantine/core";

type Props = {
  initialSpendings: Spending[];
};

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

  const initialSpendings = await prisma.spending.findMany({
    where: {
      user: {
        email: session.user?.email,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  console.table(initialSpendings);
  return {
    props: { initialSpendings },
  };
};

const SpendingsPage: NextPage<Props> = ({ initialSpendings }: Props) => {
  const [spendings, setSpendings] = useState<Spending[]>(initialSpendings);

  const [openedSpendingModal, setOpenedSpendingModal] = useState<OpenedSpendingModal>(null);

  const [selectedSpendingId, setSelectedSpendingId] = useState<string | null>(null);

  const { status } = useSession();

  const getSpending = (id: string): Spending => {
    return spendings.find((spending) => spending.id === id) as Spending;
  };

  const openEditSpendingModal = (id: string) => {
    setSelectedSpendingId(id);
    setOpenedSpendingModal("EDIT");
  };

  const openDeleteSpendingModal = (id: string) => {
    setSelectedSpendingId(id);
    setOpenedSpendingModal("DELETE");
  };
  return (
    <>
      <Layout>
        {openedSpendingModal === "ADD" && (
          <AddSpendingModal
            setOpenedSpendingModal={setOpenedSpendingModal}
            spendings={spendings}
            setSpendings={setSpendings}
          />
        )}
        {openedSpendingModal === "EDIT" && (
          <EditSpendingModal
            spendingToUpdate={getSpending(selectedSpendingId as string)}
            setOpenedSpendingModal={setOpenedSpendingModal}
            spendings={spendings}
            setSpendings={setSpendings}
            setSelectedSpendingId={setSelectedSpendingId}
          />
        )}
        {openedSpendingModal === "DELETE" && (
          <DeleteSpendingModal
            spendingIdToDelete={selectedSpendingId as string}
            setOpenedSpendingModal={setOpenedSpendingModal}
            spendings={spendings}
            setSpendings={setSpendings}
            setSelectedSpendingId={setSelectedSpendingId}
          />
        )}
        {status === "loading" ? (
          <div className="self-center m-10">
            <Loader />
          </div>
        ) : (
          <ModifiableSpendingTable
            spendings={spendings}
            setOpenedSpendingModal={setOpenedSpendingModal}
            openEditSpendingModal={openEditSpendingModal}
            openDeleteSpendingModal={openDeleteSpendingModal}
          />
        )}
      </Layout>
    </>
  );
};

export default SpendingsPage;
