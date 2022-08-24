import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { TimePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewEvent = ({ events, setEvents, slot, closeModal }) => {
  //const initialTime = new Date(0, 0, 0, new Date().getHours());

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: slot,
    hour: "",
  });

  const handleAddEvent = (event) => {
    event.preventDefault();
    const year = newEvent.date.split("-")[0];
    const month = newEvent.date.split("-")[1];
    const day = newEvent.date.split("-")[2];
    const hour = newEvent.hour.getHours();

    setEvents([
      ...events,
      {
        title: newEvent.title,
        start: new Date(year, month - 1, day, hour),
        end: new Date(year, month - 1, day, hour + 1),
      },
    ]);

    console.log(events);

    closeModal();
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h5" pb={3}>
        Add new event
      </Typography>

      <form onSubmit={handleAddEvent}>
        <Stack spacing={3}>
          <TextField
            label="Title"
            required
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />

          <TextField disabled label="Date" value={slot} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Available Slots"
              renderInput={(props) => <TextField {...props} required />}
              value={newEvent.hour}
              onChange={(e) => {
                setNewEvent({ ...newEvent, hour: e });
              }}
              shouldDisableTime={(timeValue, clockType) => {
                let sameDateEvents = events.filter((event) => {
                  let evDate = event.start.toISOString().split("T")[0];
                  return evDate === newEvent.date;
                });

                let hours = [];
                sameDateEvents.map((event) =>
                  hours.push(event.start.getHours())
                );

                if (
                  clockType === "hours" &&
                  hours.find((hour) => timeValue === hour)
                ) {
                  return true;
                }

                return false;
              }}
              views={["hours"]}
            />
          </LocalizationProvider>

          <Button type="submit" variant="contained">
            Add Event
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default NewEvent;
