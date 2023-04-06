import React, { useEffect, useState } from "react";
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
import { Button, Header, Input, ModalSetting } from "../components";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { getDatabase, ref, get, child } from "firebase/database";
import { loadSettingTicket } from "../redux/dataTicketSlice";
import { TicketSetting } from "../typeProps/index";
import app from "../database/firabaseConfig";
import { settingTicket } from "../data/dummy";
import star from "../assets/icon/star.png";
import update from "../assets/icon/fi_edit.png";

type grid = {
  handleUpdate: () => void;
};
const gridStatusSetting = ({ handleUpdate }: grid) => (
  <div className="flex align-center gap-1">
    <img src={`${update}`} alt="" />
    <button
      className="button-update capitalize rounded-2xl text-md"
      onClick={handleUpdate}
    >
      Cập nhật
    </button>
  </div>
);

const Setting = () => {
  const dbRef = ref(getDatabase(app));
  const dispatcher = useAppDispatch();
  const data = useAppSelector((state) => state.ticket.ticketSetting);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const [ticketSetting, setTicketSetting] = useState<
    TicketSetting[] | undefined
  >();
  const editing = { allowDeleting: true, allowEditing: true };

  const handleAddPackage = () => {
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    const handleReadAllData = () => {
      get(child(dbRef, `settingTicket/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let data = [snapshot.val()];
            let [a, ...result] = data[0];
            dispatcher(loadSettingTicket(result));
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
  useEffect(() => setTicketSetting(data), [data]);
  return (
    <div className="md:m-10 md:mb-0 md:ml-0 mt-24 p-2 md:p-8 md:pb-12 md:pt-4 md:pl-6 bg-white rounded-3xl">
      <Header
        title="Danh sách gói vé"
        style={{ lineHeight: "123%", fontSize: 36, fontWeight: 700 }}
      />
      <div className="flex align-center justify-between">
        <div className="flex align-center relative">
          <Input type="router" placeholder="Tìm bằng số vé" />
        </div>
        <div className="flex align-center gap-5">
          <Button
            text="Xuất file (.csv)"
            icon=""
            bgHoverColor=""
            handleClick={() => {}}
            size={10}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#FF993C",
              border: "1px solid #FF993C",
              fontSize: 18,
              borderRadius: 6,
            }}
          />
          <Button
            text="Thêm gói vé"
            icon=""
            bgHoverColor=""
            size={10}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#FF993C",
              border: "1px solid #FF993C",
              fontSize: 18,
              borderRadius: 6,
            }}
            handleClick={handleAddPackage}
          />
        </div>
      </div>

      <GridComponent
        id="gridcomp"
        dataSource={ticketSetting}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        editSettings={editing}
      >
        <ColumnsDirective>
          {settingTicket.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
          <ColumnDirective
            field=""
            headerText=""
            textAlign="Left"
            width="70"
            template={gridStatusSetting}
          />
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
        <ModalSetting
          title="Thêm gói vé"
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          icon={star}
        />
      )}
    </div>
  );
};

export default Setting;
