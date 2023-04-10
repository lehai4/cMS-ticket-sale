import React from "react";
import iconQuanly from "../assets/icon/quanlythietbi.png";
import iconHome from "../assets/icon/home.png";
import iconDoisoatve from "../assets/icon/doisoatve.png";
import iconCatdat from "../assets/icon/caidat.png";
import iconVe from "../assets/icon/quanlyve.png";
import iconBar from "../assets/icon/iconBar.png";
import use from "../assets/icon/use.png";
import nouse from "../assets/icon/nouse.png";
import invalid from "../assets/icon/invalid.png";
import update from "../assets/icon/fi_edit.png";

export const gridTicketStatus = (props) => (
  <>
    {props.statusTicket === 1 ? (
      <div className="status status--use inline-flex ">
        <img src={`${use}`} alt="" />
        <button
          type="button"
          className="button-status capitalize rounded-2xl text-md"
        >
          Đã sử dụng
        </button>
      </div>
    ) : props.statusTicket === 0 ? (
      <div className="status status--noUse inline-flex">
        <img src={`${nouse}`} alt="" />
        <button
          type="button"
          className="button-status capitalize rounded-2xl text-md"
        >
          Chưa sử dụng
        </button>
      </div>
    ) : props.statusTicket === -1 ? (
      <div className="status status--invalid inline-flex">
        <img src={`${invalid}`} alt="" />
        <button
          type="button"
          className="button-status capitalize rounded-2xl text-md"
        >
          Hết hạn
        </button>
      </div>
    ) : (
      <></>
    )}
  </>
);
export const gridSettingTicket = (props) => (
  <>
    {props.status === 1 ? (
      <div className="status status--noUse inline-flex">
        <img src={`${nouse}`} alt="" />
        <button
          type="button"
          className="button-status capitalize rounded-2xl text-md"
        >
          Đang áp dụng
        </button>
      </div>
    ) : props.status === 0 ? (
      <div className="status status--invalid inline-flex">
        <img src={`${invalid}`} alt="" />
        <button
          type="button"
          className="button-status capitalize rounded-2xl text-md"
        >
          Tắt
        </button>
      </div>
    ) : (
      <></>
    )}
  </>
);
export const gridStatusCheck = (props) => (
  <>
    {props.statusCheck === 1 ? (
      <span className="status-check status-check--true capitalize rounded-2xl text-md">
        Đã đối soát
      </span>
    ) : props.statusCheck === 0 ? (
      <span className="status-check status-check--false capitalize rounded-2xl text-md">
        Chưa đối soát
      </span>
    ) : (
      <></>
    )}
  </>
);

export const links = [
  {
    name: "Trang chủ",
    iconVector: iconHome,
    path: "",
  },
  {
    name: "Quản lý vé",
    iconVector: iconVe,
    path: "quan-ly-ve",
  },
  {
    name: "Đối soát vé",
    iconVector: iconDoisoatve,
    path: "doi-soat-ve",
  },
  {
    name: "Danh sách sự kiện",
    iconVector: iconBar,
    path: "danh-sach-su-kien",
  },
  {
    name: "Quản lý thiết bị",
    iconVector: iconQuanly,
    path: "quan-ly-thiet-bi",
  },
  {
    name: "Cài đặt",
    iconVector: iconCatdat,
    path: "cai-dat",
  },
];

export const settingTicket = [
  {
    field: "uiId",
    headerText: "STT",
    width: "50",
    textAlign: "Center",
  },
  {
    field: "packageCode",
    headerText: "Mã gói",
    width: "70",
    editType: "dropdownedit",
    textAlign: "Left",
  },
  {
    field: "packageName",
    headerText: "Tên gói vé",
    width: "70",
    textAlign: "Center",
  },
  {
    field: "dayApply",
    headerText: "Ngày áp dụng",
    width: "80",
    textAlign: "Right",
  },
  {
    field: "dayExpire",
    headerText: "Ngày hết hạn",
    width: "75",
    textAlign: "Right",
  },
  {
    field: "price",
    headerText: "Giá vé(VNĐ/Vé)",
    width: "90",
    textAlign: "Right",
  },
  {
    field: "priceCombo",
    headerText: "Giá Combo (VNĐ/Combo)",
    width: "130",
    textAlign: "Center",
  },
  {
    field: "status",
    headerText: "Tình trạng",
    template: gridSettingTicket,
    textAlign: "Left",
    width: "90",
  },
];
export const ticketCheck = [
  {
    field: "uiId",
    headerText: "STT",
    width: "38",
    textAlign: "Center",
  },
  {
    field: "ticketNumber",
    headerText: "Số vé",
    width: "58",
    textAlign: "Left",
  },
  {
    field: "event",
    headerText: "Tên sự kiện",
    width: "105",
    textAlign: "Left",
  },
  {
    field: "dayUseTicket",
    headerText: "Ngày sử dụng",
    width: "75",
    textAlign: "Left",
  },
  {
    field: "nameTicket",
    headerText: "Loại vé",
    width: "48",
    textAlign: "Left",
  },
  {
    field: "checkIn",
    headerText: "Cổng check-in",
    width: "75",
    textAlign: "Left",
  },
  {
    field: "statusCheck",
    headerText: "",
    template: gridStatusCheck,
    textAlign: "Left",
    width: "65",
  },
];
export const ordersGrid = [
  {
    field: "uiId",
    headerText: "STT",
    width: "70",
    textAlign: "Center",
  },
  {
    field: "code",
    headerText: "Booking code",
    width: "90",
    editType: "dropdownedit",
    textAlign: "Left",
  },
  {
    field: "ticketNumber",
    headerText: "Số vé",
    width: "80",
    textAlign: "Left",
  },
  {
    field: "event",
    headerText: "Tên sự kiện",
    width: "120",
    textAlign: "Left",
  },
  {
    field: "statusTicket",
    headerText: "Tình trạng sử dụng",
    template: gridTicketStatus,
    textAlign: "Left",
    width: "100",
  },
  {
    field: "dayUseTicket",
    headerText: "Ngày sử dụng",
    width: "90",
    textAlign: "Right",
  },
  {
    field: "dayExportedTicket",
    headerText: "Ngày xuất vé",
    width: "80",
    textAlign: "Right",
  },

  {
    field: "checkIn",
    headerText: "Cổng check - in",
    width: "100",
    textAlign: "Left",
  },
];

export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];

export const statusUse = [
  { id: 0, text: "Tất cả", numberRadio: "radio1", statusTicket: "all" },
  { id: 1, text: "Đã sử dụng", numberRadio: "radio2", statusTicket: 1 },
  { id: 2, text: "Chưa sử dụng", numberRadio: "radio3", statusTicket: 0 },
  { id: 3, text: "Hết hạn", numberRadio: "radio4", statusTicket: -1 },
];
export const statusCheckIn = [
  { id: 0, name: "Cổng 1" },
  { id: 1, name: "Cổng 2" },
  { id: 2, name: "Cổng 3" },
  { id: 3, name: "Cổng 4" },
  { id: 4, name: "Cổng 5" },
];
export const statusCheck = [
  { id: 0, text: "Tất cả", numberRadio: "radio1", statusCheck: "all" },
  { id: 1, text: "Đã đối soát", numberRadio: "radio2", statusCheck: 1 },
  { id: 2, text: "Chưa đối soát", numberRadio: "radio3", statusCheck: 0 },
];
//pagination
export const Pagination = () => {
  let gridElement = document.getElementById("gridcomp");
  if (gridElement && gridElement.ej2_instances[0]) {
    let gridInstance = gridElement.ej2_instances[0];
    const rowHeight = gridInstance.getRowHeight();
    const gridHeight = gridInstance.height;
    const pageSize = gridInstance.pageSettings.pageSize;
    const pageResize = (gridHeight - pageSize * rowHeight) / rowHeight;
    // gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
};
