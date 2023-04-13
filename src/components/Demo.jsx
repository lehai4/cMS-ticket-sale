import { render } from "react-dom";
import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Page,
  Edit,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-grids";
import Header from "./Header";

var data = [
  {
    OrderID: 10248,
    CustomerID: "VINET",
    EmployeeID: 5,
    ShipCountry: "France",
    Freight: 32.38,
    Verified: true,
    Status: true,
    Paid: true,
  },
  {
    OrderID: 10249,
    CustomerID: "TOMSP",
    EmployeeID: 6,
    ShipCountry: "Germany",
    Freight: 11.61,
    Verified: false,
    Status: false,
    Paid: false,
  },
  {
    OrderID: 10250,
    CustomerID: "HANAR",
    EmployeeID: 2,
    ShipCountry: "Brazil",
    Freight: 65.83,
    Verified: true,
    Status: true,
    Paid: false,
  },
  {
    OrderID: 10251,
    CustomerID: "VICTE",
    EmployeeID: 3,
    ShipCountry: "France",
    Freight: 41.34,
    Verified: true,
    Status: false,
    Paid: true,
  },
  {
    OrderID: 10252,
    CustomerID: "SUPRD",
    EmployeeID: 4,
    ShipCountry: "Belgium",
    Freight: 51.3,
    Verified: true,
    Status: false,
    Paid: false,
  },
  {
    OrderID: 10253,
    CustomerID: "HANAR",
    EmployeeID: 3,
    ShipCountry: "Brazil",
    Freight: 58.17,
    Verified: true,
    Status: true,
    Paid: false,
  },
];
var grid;
var toolbarOptions = ["Add", "Delete", "Update", "Cancel"];
var editSettings = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  mode: "Batch",
};
var pageSettings = { pageCount: 5 };

function cellEdit(args) {}

const SyncGrid = () => {
  const [isEditS, setIsEditS] = useState(false);
  const editClick = (args) => {
    setIsEditS(!isEditS);
  };
  const editTemplate = (args) => {
    console.log(args);
    return (
      <>
        <Header title="Update" style={{ color: "#ffffff" }} />
      </>
    );
  };

  const columns = [
    {
      field: "OrderID",
      headerText: "Order ID",
      width: "120",
      textAlign: "Right",
      isPrimaryKey: true,
    },
    {
      field: "ShipCountry",
      headerText: "Ship Country",
      width: "150",
      editType: "dropdownedit",
      editTemplate: editTemplate,
    },
  ];
  return (
    <div>
      <p>isEditS {isEditS ? "true" : "false"}</p>
      <button onClick={editClick.bind(this)}>change state value</button>
      <GridComponent
        ref={(g) => (grid = g)}
        dataSource={data}
        pageSettings={pageSettings}
        toolbar={toolbarOptions}
        allowPaging={true}
        editSettings={editSettings}
        cellEdit={cellEdit.bind(this)}
        columns={columns}
      >
        <Inject services={[Page, Toolbar, Edit]} />
      </GridComponent>
    </div>
  );
};

export default SyncGrid;
