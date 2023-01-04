import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#285aff',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface ListTableProps {
  columns: ColumnDef<any>[];
  data: any[];
}

const ListTable = (props: ListTableProps) => {
  const { data, columns } = props;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table" size="small" sx={{ maxHeight: 440 }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <StyledTableCell key={header.id}>
                  <span className="capitalize font-bold">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </span>
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <StyledTableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <StyledTableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={table.getState().pagination.pageIndex + 1}
        rowsPerPage={table.getState().pagination.pageSize || 10}
        page={table.getPageCount()}
        onPageChange={(event, pageNumber) => {
          table.setPageIndex(pageNumber);
        }}
        onRowsPerPageChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      />
    </TableContainer>
  );
};

export default ListTable;
