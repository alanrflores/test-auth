import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
export interface Data {
  id: number;
  title: string;
  body: string;
  userId: number;
}
interface DataTableProps {
  data: Data[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const DataTable = ({ data, onEdit, onDelete }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.body.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <TextField
        margin="normal"
        fullWidth
        id="search"
        label="Buscar"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Contenido</TableCell>
              <TableCell>Usuario</TableCell>
              {onEdit && <TableCell>Editar</TableCell>}
              {/* {onDelete && <TableCell>Eliminar</TableCell>} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.body}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                    {onEdit && (
                      <TableCell>
                        <Button variant="outlined" color="info" onClick={() => onEdit(row.id)}>
                          <EditIcon />
                        </Button>
                      </TableCell>
                    )}
                    {/* {onDelete && (
                      <TableCell>
                        <Button variant="outlined" color="error" onClick={() => onDelete(row.id)}>Eliminar</Button>
                      </TableCell>
                    )} */}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
