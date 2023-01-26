import { useState, useEffect } from "react";
import { Spending } from "@prisma/client";
import SpendingTable from "@components/spending-table";
import AddSpendingForm from "@components/add-spending-form";
import { Button, Group } from "@mantine/core";
import { SpendingCategory } from "@modeling/spending-category";

type Props = {
  initialSpendings: Spending[];
};

const ModifiableSpendingTable = ({ initialSpendings }: Props) => {
  const [spendings, setSpendings] = useState<Spending[]>(initialSpendings);

  return (
    <div className="flex flex-col items-center m-10 bg-teal-100">
      <SpendingTable spendings={spendings} />
      <div className="flex m-10 bg-teal-200">
        <AddSpendingForm spendings={spendings} setSpendings={setSpendings} />
        <Button
          onClick={() => setSpendings([])}
          color="red"
          disabled={spendings.length === 0}
          className="w-32 self-center m-10"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ModifiableSpendingTable;
