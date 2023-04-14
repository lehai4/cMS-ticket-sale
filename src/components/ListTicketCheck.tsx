import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Button, Header, Input, Wrapper } from ".";
import { TicketCheck, TicketField } from "../typeProps";

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
    <Wrapper className="md:m-6 md:mb-0 md:ml-0 mt-24 p-2 md:p-8 md:pb-12 md:pt-4 md:pl-6 bg-white rounded-3xl">
      <Header
        title="Đối soát vé"
        style={{
          fontWeight: 700,
          fontSize: 36,
          lineHeight: "123%",
          color: "#1E0D03",
        }}
      />
      <Wrapper className="flex align-center justify-between">
        <Wrapper className="flex align-center relative">
          <Input
            option="router"
            name=""
            disabled
            width={446}
            value=""
            typeInput=""
            className="search-input router"
            placeholder={placeholder}
            handleChange={() => {}}
          />
        </Wrapper>
        <Wrapper className="flex align-center gap-3">
          {isButton === 1 ? (
            <Button
              text="Xuất file (.csv)"
              size={10}
              icon={""}
              bgHoverColor=""
              handleClick={() => {}}
              style={{
                height: 48,
                color: "#FF993C",
                fontSize: "18px",
                borderRadius: "6px",
                border: "1px solid #FF993C",
                backgroundColor: "#FFFFFF",
              }}
            />
          ) : (
            <Button
              text="Chốt đối soát"
              size={10}
              icon={""}
              bgHoverColor=""
              handleClick={() => {}}
              style={{
                height: 48,
                border: "1px solid #FF993C",
                color: "#FFFFFF",
                fontSize: "18px",
                borderRadius: "6px",
                backgroundColor: "#FF993C",
              }}
            />
          )}
        </Wrapper>
      </Wrapper>

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
      >
        <ColumnsDirective>
          {ticketCheck.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page]} />
      </GridComponent>
    </Wrapper>
  );
};

export default ListTicketCheck;
