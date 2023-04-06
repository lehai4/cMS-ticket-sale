import React, { Component, useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import {
  contextMenuItems,
  ordersGrid,
  statusUse,
  statusCheckIn,
  Pagination,
} from "../data/dummy";
import moment from "moment";
import { Button, Header, Input, ModalManagerTicket } from "../components";
import { getDatabase, ref, get, child } from "firebase/database";
import filterIcon from "../assets/icon/filter.png";
import app from "../config/firabaseConfig";

interface TicketDate {
  uiId: number;
  code: string;
  checkIn: string;
  dayExportedTicket: string;
  dayUseTicket: string;
  event: string;
  statusTicket: number;
  ticketNumber: string;
}

const TicketManagement = () => {
  const dbRef = ref(getDatabase(app));
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [valRadio, setValRadio] = useState<string | number | undefined>();
  const [dayFrom, setDayFrom] = useState("");
  const [dayTo, setDayTo] = useState("");
  const [radio, setRadio] = useState<string | number | undefined>();
  const [ticket, setTicket] = useState<TicketDate[] | undefined>();
  const [originalTicket, setOriginalTicket] = useState<
    TicketDate[] | undefined
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
    let result: TicketDate[] | undefined = [];
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

  const handleReadAllData = () => {
    get(child(dbRef, `ticket/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = [snapshot.val()];
          let [a, ...result] = data[0];
          setTicket(result);
          setOriginalTicket(result);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    handleReadAllData();
  }, []);

  return (
    <div className="md:m-10 md:mb-0 md:ml-0 mt-24 p-2 md:p-8 md:pb-6 md:pt-4 md:pl-6 bg-white rounded-3xl">
      <Header
        title="Danh sách vé"
        style={{
          fontWeight: "700",
          fontSize: "36px",
          lineHeight: "123%",
          fontFamily: "Montserrat",
        }}
      />
      <div className="flex align-center justify-between">
        <div className="flex align-center relative">
          <Input type="router" placeholder="Tìm bằng số vé" />
        </div>
        <div className="flex align-center gap-3">
          <Button
            text="Lọc vé"
            size={10}
            handleClick={handleFilter}
            icon={filterIcon}
            bgHoverColor=""
            style={{
              gap: 12,
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
              border: "1px solid #FF993C",
              color: "#FF993C",
              fontSize: "18px",
              borderRadius: "6px",
              backgroundColor: "#FFFFFF",
            }}
          />
        </div>
      </div>
      <GridComponent
        id="gridcomp"
        load={Pagination}
        // pageSizes
        dataSource={ticket}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        // contextMenuItems={contextMenuItems}
        editSettings={editing}
        height={580}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
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
    </div>
  );
};
export default TicketManagement;
