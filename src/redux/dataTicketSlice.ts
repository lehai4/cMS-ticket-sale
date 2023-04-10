import { createSlice } from "@reduxjs/toolkit";
import {
  TicketManagementData,
  TicketCheck,
  TicketSetting,
} from "../typeProps/index";
import type { PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  ticketManagement: TicketManagementData[];
  ticketControl: TicketCheck[];
  ticketSetting: TicketSetting[];
};
const ticketManagement: TicketManagementData[] = [];
const ticketControl: TicketCheck[] = [];
const ticketSetting: TicketSetting[] = [];
const initialState: initialStateType = {
  ticketManagement,
  ticketControl,
  ticketSetting,
};
export const dataTicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    loadTicketManager: (
      state,
      action: PayloadAction<TicketManagementData[]>
    ) => {
      return { ...state, ticketManagement: action.payload };
    },
    loadTicketControl: (state, action: PayloadAction<TicketCheck[]>) => {
      return { ...state, ticketControl: action.payload };
    },
    loadSettingTicket: (state, action: PayloadAction<TicketSetting[]>) => {
      return { ...state, ticketSetting: action.payload };
    },
    addSettingTicket: (state, action: PayloadAction<TicketSetting>) => {
      return {
        ...state,
        ticketSetting: [...state.ticketSetting, action.payload],
      };
    },
    updateSettingTicket: (state, action: PayloadAction<TicketSetting>) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  loadTicketManager,
  loadTicketControl,
  loadSettingTicket,
  addSettingTicket,
  updateSettingTicket,
} = dataTicketSlice.actions;

export default dataTicketSlice.reducer;
