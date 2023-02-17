import { Modal } from "@mantine/core";
import { Spending } from "@prisma/client";
import { SetStateAction, useState } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import AddSpendingForm from "@components/tracking/forms/add-spending-form";

type Props = {
  spendings: Spending[];
  monthIndex: number;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
};

const AddSpendingModal = ({ setOpenedSpendingModal, spendings, monthIndex }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  return (
    <Modal
      opened={isOpened}
      onClose={() => setOpenedSpendingModal(null)}
      centered
      title="Add spending"
    >
      <AddSpendingForm
        spendings={spendings}
        monthIndex={monthIndex}
        setModalIsOpened={setIsOpened}
        setOpenedSpendingModal={setOpenedSpendingModal}
      />
    </Modal>
  );
};

export default AddSpendingModal;
