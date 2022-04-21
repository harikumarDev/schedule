import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "./HomePage.module.css";
import Today from "./Today";
import { getTime, getLocalTime } from "../../utils/time";

const isTmrw = (contestDate) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const date = getLocalTime(tomorrow);
  return date.substring(0, 9) === contestDate.substring(0, 9);
};

const isLater = (contestDate) => {
  const today = new Date();
  const later = new Date(today);
  later.setDate(later.getDate() + 2);

  const date = getLocalTime(later);
  return date.substring(0, 9) === contestDate.substring(0, 9);
};

export default function HomePage({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.today}>
        <h1>Today</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.todayContent}>
          <Today data={data} />
        </div>
        <div className={styles.upcoming}>
          <div className={styles.tmrwContent}>
            <h2>Tomorrow</h2>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead sx={{ background: "#ffad33" }}>
                  <TableRow>
                    <TableCell>Site</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .filter((item) => isTmrw(item.start_time))
                    .map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.site}</TableCell>
                        <TableCell>{getTime(row.start_time)}</TableCell>
                        <TableCell>
                          <a target="_blank" rel="noreferrer" href={row.url}>
                            Go
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ marginTop: "32px" }} className={styles.datContent}>
            <h2>Later</h2>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead sx={{ background: "grey" }}>
                  <TableRow>
                    <TableCell>Site</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .filter((item) => isLater(item.start_time))
                    .map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.site}</TableCell>
                        <TableCell>{getTime(row.start_time)}</TableCell>
                        <TableCell>
                          <a target="_blank" rel="noreferrer" href={row.url}>
                            Go
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
