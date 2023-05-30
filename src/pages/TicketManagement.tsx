import { child, get, getDatabase, ref } from "firebase/database";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import filterIcon from "../assets/icon/filter.png";
import {
  Button,
  Header,
  Helmet,
  Input,
  ModalManagerTicket,
  Wrapper,
} from "../components";
import app from "../database/firebaseConfig";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  gridTicketStatus,
  paginationComponentOptions,
  statusCheckIn,
  statusUse,
} from "../mock/dummy";
import { loadTicketManager } from "../redux/dataTicketSlice";
import { TicketManagementData } from "../typeProps/index";

const TicketManagement = () => {
  const dbRef = ref(getDatabase(app));
  const dispatcher = useAppDispatch();
  const data = useAppSelector((state) => state.ticket.ticketManagement);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [valRadio, setValRadio] = useState<string | number | undefined>();

  const [dayFrom, setDayFrom] = useState<Date | undefined>();
  const [dayTo, setDayTo] = useState<Date | undefined>();
  const [radio, setRadio] = useState<string | number | undefined>();
  const [ticket, setTicket] = useState<TicketManagementData[]>([]);
  const [originalTicket, setOriginalTicket] = useState<TicketManagementData[]>(
    []
  );
  const columns: TableColumn<TicketManagementData>[] = [
    {
      name: "STT",
      selector: (row) => row.uiId,
      allowOverflow: false,
      width: "100px",
      center: true,
    },
    {
      name: "Booking Code",
      selector: (row) => row.code,
      allowOverflow: false,
      width: "160px",
    },
    {
      name: "Số vé",
      selector: (row) => row.ticketNumber,
      allowOverflow: false,
      width: "150px",
    },
    {
      name: "Tên sự kiện",
      selector: (row) => row.event,
      allowOverflow: false,
      width: "280px",
    },
    {
      name: "Tình trạng sử dụng",
      cell: (row) => gridTicketStatus(row),
      allowOverflow: false,
      width: "220px",
    },
    {
      name: "Ngày sử dụng",
      selector: (row) => row.dayUseTicket,
      allowOverflow: false,
      width: "190px",
    },
    {
      name: "Ngày xuất vé",
      selector: (row) => row.dayExportedTicket,
      allowOverflow: false,
      width: "190px",
    },
    {
      name: "Cổng check - in",
      selector: (row) => row.checkIn,
      allowOverflow: false,
      width: "190px",
    },
  ];
  const stringToBool = (value: string) => {
    if (value) {
      return value.toString().toLowerCase() === "true";
    }
    return false;
  };

  const handleFilter = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let newValue = stringToBool(value);
    setIsCheckAll(newValue);
    setIsCheck(newValue ? statusCheckIn.map((li) => li.name.toString()) : []);
  };

  const handleClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target;
    let newValue = stringToBool(value);
    setIsCheck([...isCheck, name]);
    if (!newValue) {
      setIsCheck(isCheck.filter((item) => item !== name));
      setIsCheckAll(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: number | string
  ) => {
    setRadio(Number(e.target.value));
    setValRadio(type);
  };
  const handleChangeDate = (date: any, type: string) => {
    type === "dayPrev" ? setDayFrom(date) : setDayTo(date);
  };

  const handleFilterModal = () => {
    let result: TicketManagementData[] | undefined = [];
    result = originalTicket;

    if (dayFrom !== undefined && dayTo !== undefined) {
      let dateFrom = moment(dayFrom);
      let dateTo = moment(dayTo);
      result = result?.filter(
        (item) =>
          moment(item.dayExportedTicket, "DD/MM/YYYY").isSameOrAfter(
            dateFrom
          ) &&
          dateTo.isSameOrAfter(moment(item.dayExportedTicket, "DD/MM/YYYY"))
      );
    }
    if (valRadio || valRadio === 0) {
      result =
        valRadio !== "all"
          ? result?.filter((item) => item.statusTicket === valRadio)
          : result;
    }
    if (isCheck.length > 0) {
      result = result?.filter((item) =>
        isCheck.some((i) => i.includes(item.checkIn))
      );
    }
    handleClear();
    setTicket(result);
    closeModal();
  };

  const handleClear = () => {
    setIsCheck([]);
    setIsCheckAll(false);
    setRadio(undefined);
    setDayFrom(undefined);
    setDayTo(undefined);
    setValRadio("");
  };

  useEffect(() => {
    const loadTicketData = () => {
      get(child(dbRef, `ticket/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let data = [snapshot.val()];
            let [a, ...result] = data[0];
            dispatcher(loadTicketManager(result));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    loadTicketData();
  }, []);
  useEffect(() => {
    setTicket(data);
    setOriginalTicket(data);
  }, [data]);

  return (
    <Wrapper className="md:m-10 md:mb-0 md:ml-0 mt-24 p-2 md:p-8 md:pb-6 md:pt-4 md:pl-6 bg-white rounded-3xl">
      <Helmet title="Quản lý vé">
        <Header
          title="Danh sách vé"
          style={{
            fontWeight: "700",
            fontSize: "36px",
            lineHeight: "123%",
            fontFamily: "Montserrat",
          }}
        />
        <Wrapper className="flex align-center justify-between">
          <Wrapper className="flex align-center relative">
            <Input
              option="router"
              typeInput=""
              disabled
              width={446}
              value=""
              name=""
              className="search-input router"
              placeholder="Tìm bằng số vé"
              handleChange={() => {}}
            />
          </Wrapper>
          <Wrapper className="flex align-center gap-3">
            <Button
              text="Lọc vé"
              size={10}
              handleClick={handleFilter}
              icon={filterIcon}
              bgHoverColor=""
              style={{
                gap: 12,
                height: 45,
                border: "1px solid #FF993C",
                color: "#FF993C",
                fontSize: "18px",
                borderRadius: "6px",
                backgroundColor: "#FFFFFF",
              }}
            />
            <Button
              text="Xuất file (.csv)"
              size={10}
              handleClick={() => {}}
              icon={""}
              bgHoverColor=""
              style={{
                gap: 0,
                height: 45,
                border: "1px solid #FF993C",
                color: "#FF993C",
                fontSize: "18px",
                borderRadius: "6px",
                backgroundColor: "#FFFFFF",
              }}
            />
          </Wrapper>
        </Wrapper>
        <Wrapper className="content-table">
          <DataTable
            columns={columns}
            data={ticket}
            pagination
            responsive
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationComponentOptions={paginationComponentOptions}
          />
        </Wrapper>
        {modalIsOpen && (
          <ModalManagerTicket
            title="Lọc vé "
            dayFrom={dayFrom}
            dayTo={dayTo}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            statusUse={statusUse}
            statusCheckIn={statusCheckIn}
            isCheckAll={isCheckAll}
            radio={radio}
            isCheck={isCheck}
            handleClick={handleClick}
            handleChange={handleChange}
            handleSelectAll={handleSelectAll}
            handleChangeDate={handleChangeDate}
            handleFilterModal={handleFilterModal}
          />
        )}
      </Helmet>
    </Wrapper>
  );
};
export default TicketManagement;
