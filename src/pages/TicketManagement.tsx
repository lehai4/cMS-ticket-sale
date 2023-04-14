import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
} from "@syncfusion/ej2-react-grids";
import {
  ordersGrid,
  statusUse,
  statusCheckIn,
  Pagination,
} from "../mock/dummy";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { getDatabase, get, ref, child } from "firebase/database";
import {
  Button,
  Header,
  Input,
  ModalManagerTicket,
  Wrapper,
} from "../components";
import { loadTicketManager } from "../redux/dataTicketSlice";
import { TicketManagementData } from "../typeProps/index";
import filterIcon from "../assets/icon/filter.png";
import app from "../database/firebaseConfig";

const TicketManagement = () => {
  const dbRef = ref(getDatabase(app));
  const dispatcher = useAppDispatch();
  const data = useAppSelector((state) => state.ticket.ticketManagement);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [valRadio, setValRadio] = useState<string | number | undefined>();
  const [dayFrom, setDayFrom] = useState("");
  const [dayTo, setDayTo] = useState("");
  const [radio, setRadio] = useState<string | number | undefined>();
  const [ticket, setTicket] = useState<TicketManagementData[] | undefined>();
  const [originalTicket, setOriginalTicket] = useState<
    TicketManagementData[] | undefined
  >();
  const editing = { allowDeleting: true, allowEditing: true };
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
  const handleChangeDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { value } = e.target;
    type === "dayPrev" ? setDayFrom(value) : setDayTo(value);
  };

  const handleFilterModal = () => {
    let result: TicketManagementData[] | undefined = [];
    result = originalTicket;

    if (dayFrom !== "" && dayTo !== "") {
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
    setDayFrom("");
    setDayTo("");
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
      <GridComponent
        id="gridcomp"
        load={Pagination}
        dataSource={ticket}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        editSettings={editing}
        height={580}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page]} />
      </GridComponent>
      {modalIsOpen && (
        <ModalManagerTicket
          title="Lọc vé "
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
    </Wrapper>
  );
};
export default TicketManagement;
