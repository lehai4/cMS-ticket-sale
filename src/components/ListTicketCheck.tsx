import React from "react";
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
import { Button, Header, Input } from ".";
import { TicketCheck, TicketField } from "../configType";

type ListTicketCheckProps = {
  editing: any;
  isButton: number;
  ticket: TicketCheck[] | undefined;
  ticketCheck: TicketField[];
  contextMenuItems: any;
  placeholder: string;
  Pagination: () => void;
};
const ListTicketCheck = ({
  editing,
  isButton,
  ticket,
  ticketCheck,
  contextMenuItems,
  Pagination,
  placeholder,
}: ListTicketCheckProps) => {
  return (
    <div className="md:m-6 md:mb-0 md:ml-0 mt-24 p-2 md:p-8 md:pb-12 md:pt-4 md:pl-6 bg-white rounded-3xl">
      <Header
        title="Đối soát vé"
        style={{
          fontWeight: 700,
          fontSize: 36,
          lineHeight: "123%",
          color: "#1E0D03",
        }}
      />
      <div className="flex align-center justify-between">
        <div className="flex align-center relative">
          <Input type="router" placeholder={placeholder} />
        </div>
        <div className="flex align-center gap-3">
          {isButton === 1 ? (
            <Button
              text="Xuất file (.csv)"
              size={10}
              handleClick={() => {}}
              icon={""}
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
          ) : (
            <Button
              text="Chốt đối soát"
              size={10}
              handleClick={() => {}}
              icon={""}
              bgHoverColor=""
              style={{
                gap: 12,
                border: "1px solid #FF993C",
                color: "#FFFFFF",
                fontSize: "18px",
                borderRadius: "6px",
                backgroundColor: "#FF993C",
              }}
            />
          )}
        </div>
      </div>

      <GridComponent
        id="gridcomp"
        dataSource={ticket}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        load={Pagination}
        // pageSizes
      >
        <ColumnsDirective>
          {ticketCheck.map((item, index) => (
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
    </div>
  );
};

export default ListTicketCheck;
