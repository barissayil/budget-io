import { notifications } from "@mantine/notifications";
import { Check as CheckIcon } from "tabler-icons-react";

export const showLoadingNotification = (id: string, title: string, message: string) => {
  notifications.show({
    id,
    loading: true,
    title,
    message,
    autoClose: false,
    withCloseButton: false,
  });
};

export const updateToSuccessNotification = (id: string, title: string, message: string) => {
  notifications.update({
    id,
    color: "teal",
    title,
    message,
    icon: <CheckIcon size={16} />,
    autoClose: 4000,
  });
};
