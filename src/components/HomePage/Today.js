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
import { getTime, getTime2, getLocalTime } from "../../utils/time";

const isToday = (contestDate, endDate) => {
  const date = getLocalTime();
  const presentTime = new Date().getTime();
  const startTime = new Date(contestDate).getTime();
  const endTime = new Date(endDate).getTime();

  if (presentTime > endTime) return false;

  return (
    date.substring(0, 9) === contestDate.substring(0, 9) ||
    (presentTime >= startTime && presentTime <= endTime)
  );
};

export default function Today({ data }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ background: "#ffad33" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Site</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((item) => isToday(item.start_time, item.end_time))
              .map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name.length > 40
                      ? row.name.substring(0, 40) + "..."
                      : row.name}
                  </TableCell>
                  <TableCell>{row.site}</TableCell>
                  <TableCell>{getTime(row.start_time)}</TableCell>
                  <TableCell>{getTime2(row.end_time)}</TableCell>
                  <TableCell>{(row.duration / 3600).toFixed(2)} Hrs</TableCell>
                  <TableCell>
                    <a target="_blank" rel="noreferrer" href={row.url}>
                      Go
                    </a>
                  </TableCell>
                  <TableCell>
                    {row.status === "CODING" ? "Running" : "Coming up"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
