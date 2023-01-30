import { Modal } from "@mantine/core";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import AddSpendingForm from "@components/forms/add-spending-form";

type Props = {
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
};

const EditSpendingModal = ({ setOpenedSpendingModal, spendings, setSpendings }: Props) => {
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
        setSpendings={setSpendings}
        setModalIsOpened={setIsOpened}
        setOpenedSpendingModal={setOpenedSpendingModal}
      />
    </Modal>
  );
};

export default EditSpendingModal;
