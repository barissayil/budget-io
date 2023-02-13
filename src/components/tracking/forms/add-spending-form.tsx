import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import SpendingFormValues from "@modeling/spending-form-values";
import SpendingForm from "@components/tracking/forms/spending-form";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import SpendingFormSchema from "@modeling/spending-form-schema";
import { showLoadingNotification, updateToSuccessNotification } from "@lib/notifications";
import dayjs from "dayjs";
import { getTempUUID } from "@lib/uuid";
import { useSWRConfig } from "swr";

type Props = {
  spendings: Spending[];
  monthIndex: number;
  setModalIsOpened: Dispatch<SetStateAction<boolean>>;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
};

const AddSpendingForm = ({
  spendings,
  monthIndex,
  setModalIsOpened,
  setOpenedSpendingModal,
}: Props) => {
  const form = useForm<SpendingFormValues>({
    initialValues: {
      date: new Date(),
    },
    validate: SpendingFormSchema,
  });

  const { mutate } = useSWRConfig();

  const handleRequest = async ({
    date,
    amount,
    category,
  }: SpendingFormValues): Promise<Spending[]> => {
    const body = {
      date: dayjs(date).format().substring(0, 10),
      amount,
      category,
    };
    const spending: Spending = await (
      await fetch(`/api/spending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
    return [...spendings, spending];
  };

  const handleSubmit = async ({ date, amount, category }: SpendingFormValues) => {
    setModalIsOpened(false);
    setOpenedSpendingModal(null);
    showLoadingNotification(
      `add-spending-${date}-${amount}-${category}`,
      "Adding",
      "The spending is being added."
    );
    await mutate(`/api/spending/month/${monthIndex}`, handleRequest({ date, amount, category }), {
      optimisticData: [
        ...spendings,
        {
          id: getTempUUID(),
          date: dayjs(date).format().substring(0, 10),
          amount,
          category,
          userId: getTempUUID(),
          userEmail: getTempUUID(),
        },
      ],
    });
    updateToSuccessNotification(
      `add-spending-${date}-${amount}-${category}`,
      "Added",
      "The spending is added."
    );
  };

  return (
    <SpendingForm
      handleSubmit={handleSubmit}
      form={form}
      formType={"ADD"}
      setOpenedSpendingModal={setOpenedSpendingModal}
    />
  );
};

export default AddSpendingForm;
