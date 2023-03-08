import { ActionIcon, Group, Paper, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import {
  SquareArrowRight as ArrowRightIcon,
  SquareArrowLeft as ArrowLeftIcon,
} from "tabler-icons-react";

type Props = {
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
};

const MonthPaper = ({ monthIndex, setMonthIndex }: Props) => {
  return (
    <Paper shadow="xs" p="md" className="m-5 pb-0">
      <Title order={1}>{dayjs().subtract(monthIndex, "months").format("MMMM YYYY")}</Title>
      <div className="flex flex-auto flex-col items-center">
        <Group>
          <ActionIcon color="cyan" size="xl" onClick={() => setMonthIndex(monthIndex + 1)}>
            <ArrowLeftIcon size={80} strokeWidth={2} />
          </ActionIcon>
          <ActionIcon
            color="cyan"
            size="xl"
            className={monthIndex === 0 ? "collapse" : ""}
            onClick={() => setMonthIndex(monthIndex - 1)}
          >
            <ArrowRightIcon size={80} strokeWidth={2} />
          </ActionIcon>
        </Group>
      </div>
    </Paper>
  );
};

export default MonthPaper;
