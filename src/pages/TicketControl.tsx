import { child, get, getDatabase, ref } from "firebase/database";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import {
  FilterTicketCheck,
  Helmet,
  ListTicketCheck,
  Wrapper,
} from "../components";
import app from "../database/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { gridStatusCheck, statusCheck } from "../mock/dummy";
import { loadTicketControl } from "../redux/dataTicketSlice";
import { TicketCheck } from "../typeProps";

const TicketControl = () => {
  const dbRef = ref(getDatabase(app));
  const dispatcher = useAppDispatch();
  const data = useAppSelector((state) => state.ticket.ticketControl);
  const [radio, setRadio] = useState<string | number | undefined>();
  const [dayFrom, setDayFrom] = useState<Date | undefined>();
  const [dayTo, setDayTo] = useState<Date | undefined>();
  const [valRadio, setValRadio] = useState<string | number>(0);
  const [selected, setSelected] = useState<string | undefined>();
  const [isButton, setIsButton] = useState<number>(0);
  const [ticket, setTicket] = useState<TicketCheck[]>([]);
  const [originalTicket, setOriginalTicket] = useState<TicketCheck[]>([]);
  const columns: TableColumn<TicketCheck>[] = [
    {
      name: "STT",
      selector: (row) => row.uiId,
      allowOverflow: false,
      width: "70px",
      center: true,
    },
    {
      name: "Số vé",
      selector: (row) => row.ticketNumber,
      allowOverflow: false,
      width: "130px",
    },
    {
      name: "Tên sự kiện",
      selector: (row) => row.event,
      allowOverflow: false,
      width: "280px",
    },
    {
      name: "Ngày sử dụng",
      selector: (row) => row.dayUseTicket,
      allowOverflow: false,
      width: "160px",
    },
    {
      name: "Loại vé",
      selector: (row) => row.nameTicket,
      allowOverflow: false,
      width: "100px",
    },

    {
      name: "Cổng check - in",
      selector: (row) => row.checkIn,
      allowOverflow: false,
      width: "170px",
    },
    {
      name: "",
      cell: (row) => gridStatusCheck(row),
      allowOverflow: false,
      width: "150px",
    },
  ];
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string | number
  ) => {
    setRadio(Number(e.target.value));
    setValRadio(type);
  };

  const handleChangeDate = (date: any, type: string) => {
    type === "dayFrom" ? setDayFrom(date) : setDayTo(date);
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
    if (dayFrom !== undefined && dayTo != undefined) {
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
    <Helmet title="Đối soát vé">
      <Wrapper className="grid grid-flow-dense grid-template-columns">
        <ListTicketCheck
          isButton={isButton}
          ticket={ticket}
          columns={columns}
          placeholder="Tìm bằng số vé"
        />
        <FilterTicketCheck
          dayFrom={dayFrom}
          dayTo={dayTo}
          radio={radio}
          statusCheck={statusCheck}
          originalTicket={originalTicket}
          setSelected={setSelected}
          handleChange={handleChange}
          handleFilter={handleFilter}
          handleChangeDate={handleChangeDate}
        />
      </Wrapper>
    </Helmet>
  );
};
export default TicketControl;
