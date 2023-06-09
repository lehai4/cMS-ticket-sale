export type gridTicketStatusProps = {
  statusTicket: number;
};
export type gridStatusCheckProps = {
  statusCheck: number;
};
export type gridSettingTicketProps = {
  status: number;
};
export interface Ticket {
  id: number;
  text: string;
  numberRadio: string;
  statusTicket: string | number;
}
export interface StatusCheckIn {
  id: number;
  name: string;
}
export type ModalManagementTicket = {
  dayFrom: Date | undefined;
  dayTo: Date | undefined;
  title: string;
  modalIsOpen: boolean;
  statusUse: Ticket[];
  statusCheckIn: StatusCheckIn[];
  radio: number | string | undefined;
  isCheckAll: boolean;
  isCheck: string[];
  closeModal: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: number | string
  ) => void;
  handleChangeDate: (e: any, type: string) => void;
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  handleFilterModal: () => void;
};
export interface TicketCheck {
  uiId: number;
  nameTicket: string;
  dayUseTicket: string;
  event: string;
  statusCheck: number;
  checkIn: string;
  ticketNumber: string;
}
export interface TicketField {
  field: string;
  headerText: string;
  width: string;
  textAlign: string;
  template?: (props: any) => JSX.Element | undefined;
}

export interface statusCheck {
  id: number;
  text: string;
  numberRadio: string;
  statusCheck: string | number;
}
export type FilterTicketCheckProps = {
  dayFrom: Date | undefined;
  dayTo: Date | undefined;
  radio: string | number | undefined;
  originalTicket: TicketCheck[] | undefined;
  statusCheck: statusCheck[];
  setSelected: (value: string) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: number | string
  ) => void;
  handleChangeDate: (e: any, type: string) => void;
  handleFilter: () => void;
};
export interface SettingTicket {
  field: string;
  headerText: string;
  width: string;
  textAlign: string;
  editType?: undefined;
  template?: (props: any) => JSX.Element | undefined;
}
export interface TicketManagementData {
  uiId: number;
  ticketNumber: string;
  statusTicket: number;
  event: string;
  dayUseTicket: string;
  dayExportedTicket: string;
  code: string;
  checkIn: string;
}
export interface TicketSetting {
  dayApply: string;
  dayExpire: string;
  packageCode: string;
  packageName: string | undefined;
  price: string;
  priceCombo: string;
  status: number;
  uiId: number;
}
export type ModalSettingProps = {
  title: string;

  packageCode: string;
  dataFormAdd: any;
  icon: string;
  modalIsOpen: boolean;
  handleAdd: () => void;
  handleUpdateTicket: () => void;
  closeModal: () => void;
  handleChange: (e: any, type: string, opt: string) => void;
};
