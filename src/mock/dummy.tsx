import iconHome from "../assets/icon/home.png";
import iconDoisoatve from "../assets/icon/doisoatve.png";
import iconCatdat from "../assets/icon/caidat.png";
import iconVe from "../assets/icon/quanlyve.png";
import use from "../assets/icon/use.png";
import nouse from "../assets/icon/nouse.png";
import invalid from "../assets/icon/invalid.png";
import {
  gridSettingTicketProps,
  gridStatusCheckProps,
  gridTicketStatusProps,
} from "../typeProps";

export const gridTicketStatus = (props: gridTicketStatusProps) => (
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

export const gridSettingTicket = (props: gridSettingTicketProps) => (
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

export const gridStatusCheck = (props: gridStatusCheckProps) => (
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
export const data = [
  {
    name: "Thứ 2",
    total: 142,
  },
  {
    name: "Thứ 3",
    total: 170,
  },
  {
    name: "Thứ 4",
    total: 175,
  },
  {
    name: "Thứ 5",
    total: 230,
  },
  {
    name: "Thứ 6",
    total: 220,
  },
  {
    name: "Thứ 7",
    total: 210,
  },
  {
    name: "CN",
    total: 190,
  },
];

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
    name: "Cài đặt",
    iconVector: iconCatdat,
    path: "cai-dat",
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

export const paginationComponentOptions = {
  rowsPerPageText: "Page Number",
  rangeSeparatorText: "page",
  selectAllRowsItem: true,
  selectAllRowsItemText: "ALL",
};
