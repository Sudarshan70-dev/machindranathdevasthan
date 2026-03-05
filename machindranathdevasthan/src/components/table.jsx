import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ReceiptIcon from "@mui/icons-material/Receipt";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

const MuiTable = (props) => {
  const columns = props.columns;
  const rows = props.rows;
  const { t } = useTranslation();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
      <TableContainer sx={{ maxHeight: 520, minHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: "#0060df" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id ?? row.code}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}

                        {column.id === "viewReciept" && (
                          <Tooltip title={t("viewReciept")}>
                            <IconButton
                              color="primary"
                              onClick={() => props.handleViewReciept(row)}
                            >
                              <ReceiptIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
            <div className="centerDiv">{t("noRecordToast")}</div>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={props.rowsPerPageOptions}
        component="div"
        count={props.docCount}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        onPageChange={props.handleChangePage}
        onRowsPerPageChange={props.handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MuiTable;
