import { showNotification, updateNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

export const showLoadingNotification = (id: string, title: string, message: string) => {
  showNotification({
    id,
    loading: true,
    title,
    message,
    autoClose: false,
    disallowClose: true,
  });
};

export const updateToSuccessNotification = (id: string, title: string, message: string) => {
  updateNotification({
    id,
    color: "teal",
    title,
    message,
    icon: <Check size={16} />,
    autoClose: 4000,
  });
};
