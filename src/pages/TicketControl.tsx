import moment from "moment";
import app from "../database/firebaseConfig";
import React, { useEffect, useState } from "react";
import { TicketCheck } from "../typeProps";
import { get, child, ref, getDatabase } from "firebase/database";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { FilterTicketCheck, ListTicketCheck } from "../components";
import {
  contextMenuItems,
  statusCheck,
  ticketCheck,
  Pagination,
} from "../mock/dummy";
import { loadTicketControl } from "../redux/dataTicketSlice";

const TicketControl = () => {
  const dbRef = ref(getDatabase(app));
  const dispatcher = useAppDispatch();
  const data = useAppSelector((state) => state.ticket.ticketControl);
  const [radio, setRadio] = useState<string | number | undefined>();
  const [dayFrom, setDayFrom] = useState<string>("");
  const [dayTo, setDayTo] = useState<string>("");
  const [valRadio, setValRadio] = useState<string | number | undefined>();
  const [selected, setSelected] = useState<string | undefined>();
  const [isButton, setIsButton] = useState<number>(0);
  const [ticket, setTicket] = useState<TicketCheck[] | undefined>();
  const [originalTicket, setOriginalTicket] = useState<TicketCheck[]>();
  const editing = { allowDeleting: true, allowEditing: true };
  const handleChange = (
    type: string | number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRadio(Number(e.target.value));
    setValRadio(type);
  };

  const handleChangeDate = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    type === "dayFrom" ? setDayFrom(value) : setDayTo(value);
  };
  const handleFilter = () => {
    let result: TicketCheck[] | undefined = [];
    result = originalTicket;
    if (selected) {
      result = originalTicket?.filter((item) => item.event === selected);
    }
    if (valRadio || valRadio === 0) {
      result =
        valRadio !== "all"
          ? result?.filter((item) => item.statusCheck === valRadio)
          : result;
    }
    if (dayFrom !== "" && dayTo !== "") {
      let dateFrom = moment(dayFrom);
      let dateTo = moment(dayTo);
      result = result?.filter(
        (item) =>
          moment(item.dayUseTicket, "DD/MM/YYYY").isSameOrAfter(dateFrom) &&
          dateTo.isSameOrAfter(moment(item.dayUseTicket, "DD/MM/YYYY"))
      );
    }
    radio === 1 ? setIsButton(1) : setIsButton(-1);
    setTicket(result);
  };

  useEffect(() => {
    const handleReadAllData = () => {
      get(child(dbRef, `ticketcheck`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let data = [snapshot.val()];
            let [a, ...result] = data[0];
            dispatcher(loadTicketControl(result));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    handleReadAllData();
  }, []);
  useEffect(() => {
    setTicket(data);
    setOriginalTicket(data);
  }, [data]);

  return (
    <div className="grid grid-flow-dense grid-template-columns">
      <ListTicketCheck
        isButton={isButton}
        ticketCheck={ticketCheck}
        ticket={ticket}
        editing={editing}
        contextMenuItems={contextMenuItems}
        Pagination={Pagination}
        placeholder="Tìm bằng số vé"
      />
      <FilterTicketCheck
        radio={radio}
        statusCheck={statusCheck}
        originalTicket={originalTicket}
        setSelected={setSelected}
        handleChange={handleChange}
        handleFilter={handleFilter}
        handleChangeDate={handleChangeDate}
      />
    </div>
  );
};
export default TicketControl;
