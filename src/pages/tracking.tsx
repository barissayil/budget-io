import type { GetServerSideProps, NextPage } from "next";
import Layout from "@components/layout";
import { Spending } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";
import ModifiableSpendingTable from "@components/tracking/modifiable-spending-table";
import { useEffect, useState } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { useSession } from "next-auth/react";
import AddSpendingModal from "@components/tracking/modals/add-spending-modal";
import DeleteSpendingModal from "@components/tracking/modals/delete-spending-modal";
import EditSpendingModal from "@components/tracking/modals/edit-spending-modal";
import { Loader } from "@mantine/core";
import useSWR from "swr";

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

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Tracking: NextPage = () => {
  const [spendings, setSpendings] = useState<Spending[]>([]);
  const { data: initialSpendings, error } = useSWR<Spending[], Error>(
    `/api/spending/this-month`,
    fetcher
  );
  useEffect(() => {
    setSpendings(initialSpendings ?? []);
  }, [initialSpendings]);

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
      {status === "loading" || error ? (
        <div className="m-10 self-center">
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
  );
};

export default Tracking;
