import { Modal } from "@mantine/core";
import EditSpendingForm from "@components/tracking/forms/edit-spending-form";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";

type Props = {
  spendingToUpdate: Spending;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
  spendings: Spending[];
  monthIndex: number;
  setSelectedSpendingId: Dispatch<SetStateAction<string | null>>;
};

const EditSpendingModal = ({
  spendingToUpdate,
  setOpenedSpendingModal,
  spendings,
  monthIndex,
  setSelectedSpendingId,
}: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  return (
    <Modal
      opened={isOpened}
      onClose={() => setOpenedSpendingModal(null)}
      centered
      title="Edit spending"
    >
      <EditSpendingForm
        spendingToUpdate={spendingToUpdate}
        spendings={spendings}
        monthIndex={monthIndex}
        setModalIsOpened={setIsOpened}
        setSelectedSpendingId={setSelectedSpendingId}
        setOpenedSpendingModal={setOpenedSpendingModal}
      />
    </Modal>
  );
};

export default EditSpendingModal;
