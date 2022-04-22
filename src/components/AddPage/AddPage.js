import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import styles from "./AddPage.module.css";
import { ISTToUTC, timeDiff } from "../../utils/time";
import axios from "axios";
import { useRouter } from "next/router";

const todaysDate = () => {
  let currentTime = new Date();
  let currentOffset = currentTime.getTimezoneOffset();
  let ISTTime = new Date(currentTime.getTime() + (330 + currentOffset) * 60000); // IST offset UTC +5:30

  return ISTTime;
};

export default function AddPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    start_time: todaysDate(),
    end_time: todaysDate(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/addtask", {
        name: form.name,
        start_time: ISTToUTC(form.start_time),
        end_time: ISTToUTC(form.end_time),
        duration: timeDiff(ISTToUTC(form.start_time), ISTToUTC(form.end_time)),
      });

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCont}>
        <form onSubmit={handleAdd} className={styles.addForm}>
          <h2 style={{ margin: "10px" }}>Add a Task</h2>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            fullWidth
            required
            color="secondary"
            onChange={handleChange}
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              label="Start"
              value={form.start_time}
              onChange={(newValue) => {
                setForm({ ...form, start_time: newValue, end_time: newValue });
              }}
              renderInput={(params) => (
                <TextField fullWidth required margin="normal" {...params} />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              label="End"
              value={form.end_time}
              minDateTime={form.start_time}
              onChange={(newValue) => {
                setForm({ ...form, end_time: newValue });
              }}
              renderInput={(params) => (
                <TextField fullWidth required margin="normal" {...params} />
              )}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            color="warning"
            style={{ marginTop: "1em" }}
            type="submit"
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
