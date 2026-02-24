
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useTranslation } from "react-i18next";




export default function EventTable() {
  const { t } = useTranslation();

    const eventData = [
        {
          title: t("paushyaAmavasya"),
          description: t("paushyaAmavasyaText"),
          fromDate: "2024-01-25",
          toDate: "2024-01-25"
        },
        {
          title: t("falgunAmavasya"),
          description: t("falgunAmavasyaText"),
          fromDate: "2024-02-24",
          toDate: "2024-02-24"
        },
        {
          title: t("rangPanchami"),
          description: t("rangPanchamiText"),
          fromDate: "2024-03-15",
          toDate: "2024-03-15"
        },
        {
          title: t("rushiPanchami"),
          description: t("rushiPanchamiText"),
          fromDate: "2024-03-20",
          toDate: "2024-03-20"
        },
        {
          title: t("dattaJayanti"),
          description: t("dattaJayantiText"),
          fromDate: "2024-04-15",
          toDate: "2024-04-15"
        },
        {
          title: t("guruPurnima"),
          description: t("guruPurnimaText"),
          fromDate: "2024-04-20",
          toDate: "2024-04-20"
        },
        {
          title: t("monthlyAmavasya"),
          description: t("monthlyAmavasyaText"),
          fromDate: "2024-05-01",
          toDate: "2024-05-01"
        }
      ];

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          backgroundColor: "#fbdaac",
          "& .MuiTypography-root": {
            fontFamily: '"Josefin Sans", sans-serif',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: "#7F1D1D",
              fontWeight: "bold",
                backgroundColor: "#fbdaac",
                "& .MuiTypography-root": {
                  fontFamily: '"Josefin Sans", sans-serif',
                },
              }}
            >
              {t("eventTitle")}
            </TableCell>
            <TableCell
              sx={{
                color: "#7F1D1D",
              fontWeight: "bold",

                backgroundColor: "#fbdaac",
                "& .MuiTypography-root": {
                  fontFamily: '"Josefin Sans", sans-serif',
                },
              }}
              align="center"
            >
              {t("fromDate")}
            </TableCell>
            <TableCell
              sx={{
                color: "#7F1D1D",
              fontWeight: "bold",

                backgroundColor: "#fbdaac",
                "& .MuiTypography-root": {
                  fontFamily: '"Josefin Sans", sans-serif',
                },
              }}
              align="center"
            >
              {t("toDate")}
            </TableCell>
            <TableCell
              sx={{
                color: "#7F1D1D",
              fontWeight: "bold",

                backgroundColor: "#fbdaac",
                "& .MuiTypography-root": {
                  fontFamily: '"Josefin Sans", sans-serif',
                },
              }}
              align="center"
            >
              {t("description")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventData.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{
                  color: "#7F1D1D",
                  backgroundColor: "#fbdaac",
                  "& .MuiTypography-root": {
                    fontFamily: '"Josefin Sans", sans-serif',
                  },
                }}
                component="th"
                scope="row"
              >
                {row.title}
              </TableCell>
              <TableCell
                sx={{
                  color: "#7F1D1D",
                  backgroundColor: "#fbdaac",
                  "& .MuiTypography-root": {
                    fontFamily: '"Josefin Sans", sans-serif',
                  },
                }}
                align="left"
              >
                {row.fromDate}
              </TableCell>
              <TableCell
                sx={{
                  color: "#7F1D1D",
                  backgroundColor: "#fbdaac",
                  "& .MuiTypography-root": {
                    fontFamily: '"Josefin Sans", sans-serif',
                  },
                }}
                align="left"
              >
                {row.toDate}
              </TableCell>
              <TableCell
                sx={{
                  color: "#7F1D1D",
                  backgroundColor: "#fbdaac",
                  "& .MuiTypography-root": {
                    fontFamily: '"Josefin Sans", sans-serif',
                  },
                }}
                align="left"
              >
                {row.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
