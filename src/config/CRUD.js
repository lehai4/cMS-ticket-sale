import { getDatabase, ref, child, set } from "firebase/database";
import app from "./firabaseConfig";

const dbRef = ref(getDatabase(app));
function writeData({
  ticketID,
  uiId,
  code,
  ticketNumber,
  event,
  statusTicket,
  dayUseTicket,
  dayExportedTicket,
  checkIn,
}) {
  set(child(dbRef, `ticket/${ticketID}`), {
    uiId: uiId,
    code: code,
    ticketNumber: ticketNumber,
    event: event,
    statusTicket: statusTicket,
    dayUseTicket: dayUseTicket,
    dayExportedTicket: dayExportedTicket,
    checkIn: checkIn,
  });
}

export const CRUD = {
  writeData,
};
