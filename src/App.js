import React, { useState } from "react";
import { Calendar } from "react-big-calendar";
import localizer from "./util/localizer";
import { events } from "./data/events";
import Modal from "@mui/material/Modal";
import NewEvent from "./components/newEvent";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const App = () => {
  const [allEvents, setAllEvents] = useState(events);
  const [onSelectSlot, setOnSelectSlot] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const ModalHandlerOpen = (slot) => {
    setOpenModal(true);
    setOnSelectSlot(slot["end"].toISOString().split("T")[0]);
  };
  const ModalHandlerClose = () => setOpenModal(false);

  return (
    <div className="App">
      <h1>Appointment Scheduler</h1>
      <h3>Click on date to add a new Event</h3>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={(a) => console.log(a)}
        onSelectSlot={(slot) => ModalHandlerOpen(slot)}
        selectable
      />

      <Modal
        open={openModal}
        onClose={ModalHandlerClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <NewEvent
            events={allEvents}
            setEvents={setAllEvents}
            slot={onSelectSlot}
            closeModal={ModalHandlerClose}
          />
        </div>
      </Modal>
    </div>
  );
};

export default App;
