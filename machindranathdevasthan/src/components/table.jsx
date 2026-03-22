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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import { DataBaseConstant, ReportType } from "../constants";
import { useEffect, useState } from "react";

const MuiTable = (props) => {
  const columns = props.columns;
  const rows = props.rows;
  const { t } = useTranslation();
  const [openRowKey, setOpenRowKey] = useState(null);
  const reportType = props?.reportType || null;

  useEffect(() => {
    setOpenRowKey(null);
  }, [rows, reportType]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
      <TableContainer sx={{ maxHeight: 520, minHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableHead>
            <TableRow>
              {reportType === ReportType.writtenBookReport &&<TableCell></TableCell>}
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
            {rows.map((row, index) => {
              const rowKey = row.id ?? row.code ?? `${row[DataBaseConstant.counterNo] ?? "row"}-${index}`;
              const isOpen = openRowKey === rowKey;

              return (
                <React.Fragment key={rowKey}>
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    {reportType === ReportType.writtenBookReport && <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenRowKey(isOpen ? null : rowKey)}
                      >
                        {isOpen ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>}
                    {columns.map((column) => {
                      const value = row[column.id];
                      const displayValue =
                        value == null || typeof value === "boolean"
                          ? ""
                          : typeof value === "object" && !React.isValidElement(value)
                            ? ""
                            : value;

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof displayValue === "number"
                            ? column.format(displayValue)
                            : displayValue}

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
                  {reportType === ReportType.writtenBookReport && (
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={columns.length + 1}
                      >
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>{t("billBookAmt")}</TableCell>
                                <TableCell>{t("openingRecieptNo")}</TableCell>
                                <TableCell>{t("closeingRecieptNo")}</TableCell>
                                <TableCell>{t("totalAmt")}</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row?.[DataBaseConstant.books]?.map(
                                (bookDetails,index) => {
                                  return (
                                    <TableRow key={index}>
                                      <TableCell>
                                        {
                                          bookDetails?.[
                                            DataBaseConstant.ammount
                                          ]
                                        }
                                      </TableCell>
                                      <TableCell>
                                        {
                                          bookDetails?.[
                                            DataBaseConstant.openingReceipt
                                          ]
                                        }
                                      </TableCell>
                                      <TableCell>
                                        {
                                          bookDetails?.[
                                            DataBaseConstant.closingReceipt
                                          ]
                                        }
                                      </TableCell>
                                      <TableCell>
                                        {
                                          bookDetails?.[
                                            DataBaseConstant.totalAmt
                                          ]
                                        }
                                      </TableCell>
                                    </TableRow>
                                  );
                                },
                              )}
                            </TableBody>
                          </Table>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
        {rows.length === 0 ? (
          <div className="centerDiv">{t("noRecordToast")}</div>
        ) : (
          <></>
        )}
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
