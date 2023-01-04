import ListTable from '@components/ui/ListTable';
import { ColumnDef } from '@tanstack/react-table';
import { ReactElement } from 'react';

interface PERSON {
  firstName: string;
  lastName: string;
  progress: number;
}
export const UserHistoryView = (): ReactElement => {
  const defaultData: PERSON[] = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      progress: 10,
    },
  ];

  const columns: ColumnDef<PERSON>[] = [
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'progress',
      header: 'Progress',
    },
  ];
  return (
    <div>
      <ListTable columns={columns || []} data={defaultData || []} />
    </div>
  );
};
