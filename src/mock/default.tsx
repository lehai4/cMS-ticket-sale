import { gridSettingTicket, gridStatusCheck, gridTicketStatus } from "./dummy";

export const settingTicket = [
  {
    field: "uiId",
    headerText: "STT",
    width: "50",
    textAlign: "Center",
    showInColumnChooser: false,
    isPrimaryKey: true,
  },
  {
    field: "packageCode",
    headerText: "Mã gói",
    width: "70",
    editType: "dropdownedit",
    textAlign: "Left",
    showInColumnChooser: false,
  },
  {
    field: "packageName",
    headerText: "Tên gói vé",
    width: "70",
    textAlign: "Center",
    showInColumnChooser: false,
  },
  {
    field: "dayApply",
    headerText: "Ngày áp dụng",
    width: "80",
    textAlign: "Right",
    showInColumnChooser: false,
  },
  {
    field: "dayExpire",
    headerText: "Ngày hết hạn",
    width: "75",
    textAlign: "Right",
    showInColumnChooser: false,
  },
  {
    field: "price",
    headerText: "Giá vé(VNĐ/Vé)",
    width: "90",
    textAlign: "Right",
    showInColumnChooser: false,
  },
  {
    field: "priceCombo",
    headerText: "Giá Combo (VNĐ/Combo)",
    width: "130",
    textAlign: "Center",
    showInColumnChooser: false,
  },
  {
    field: "status",
    headerText: "Tình trạng",
    template: gridSettingTicket,
    textAlign: "Left",
    width: "90",
    showInColumnChooser: false,
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
