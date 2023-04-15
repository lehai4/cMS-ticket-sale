import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { getDatabase, ref, get, set, child, update } from "firebase/database";
import { Button, Header, Input, ModalSetting, Wrapper } from "../components";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import {
  loadSettingTicket,
  addSettingTicket,
  updateSettingTicket,
} from "../redux/dataTicketSlice";
import { TicketSetting } from "../typeProps/index";
import { gridSettingTicket } from "../mock/dummy";
import { toast } from "react-toastify";
import moment from "moment";
import app from "../database/firebaseConfig";
import star from "../assets/icon/star.png";
import stringWithCommas from "../utils/stringWithComas";
import numberWithCommas from "../utils/numberWithComas";
import updated from "../assets/icon/fi_edit.png";

const paginationComponentOptions = {
  rowsPerPageText: "Page Number",
  rangeSeparatorText: "page",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Package",
};

const Setting = () => {
  const dbRef = ref(getDatabase(app));
  const dispatcher = useAppDispatch();
  const data = useAppSelector((state) => state.ticket.ticketSetting);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("Thêm gói vé");
  const [packageCode, setPackageCode] = useState<string>("ALT20210501");
  const [checkbox, setCheckbox] = useState<string | undefined>();
  const [dataFormAdd, setDataFormAdd] = useState({
    dayApply: "",
    timeApply: "",
    timeExpire: "",
    dayExpire: "",
    packageCode: packageCode,
    packageName: "",
    priceComboPer: "",
    price: "",
    priceCombo: "",
    status: undefined,
    uiId: 0,
  });
  const [ticketSetting, setTicketSetting] = useState<TicketSetting[]>([]);

  const columns: TableColumn<TicketSetting>[] = [
    {
      name: "STT",
      selector: (row) => row.uiId,
      allowOverflow: false,
      width: "70px",
      center: true,
    },
    {
      name: "Mã gói",
      selector: (row) => row.packageCode,
      allowOverflow: false,
      width: "140px",
    },
    {
      name: "Tên gói vé",
      selector: (row) => (row.packageName ? row.packageName : ""),
      allowOverflow: false,
      width: "140px",
    },
    {
      name: "Ngày áp dụng",
      selector: (row) => row.dayApply,
      width: "190px",
      allowOverflow: false,
    },
    {
      name: "Ngày hết hạn",
      selector: (row) => row.dayExpire,
      width: "190px",
      allowOverflow: false,
    },
    {
      name: "Giá vé (VNĐ/vé)",
      selector: (row) => row.price,
      width: "170px",
      allowOverflow: false,
    },
    {
      name: "Giá Combo (VNĐ/Combo)",
      selector: (row) => row.priceCombo,
      allowOverflow: false,
      width: "270px",
    },
    {
      name: "Tình trạng",
      cell: (row, index, column, id) => gridSettingTicket(row),
      allowOverflow: false,
      width: "190px",
    },
    {
      cell: (row, index, column, id) => (
        <div className="flex align-center gap-1">
          <img src={`${updated}`} alt="" />
          <button
            className="button-update capitalize rounded-2xl text-md"
            onClick={() => handleOpenModalUpdate(row)}
          >
            Cập nhật
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      center: false,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataFormAdd((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setCheckbox(name);
  };
  const handleOpenModalUpdate = (ticket: TicketSetting) => {
    let timeApply = ticket.dayApply.slice(11);
    let timeExpire = ticket.dayExpire.slice(11);
    let dayApply = moment(ticket.dayApply.slice(0, 11), "DD/MM/YYYY").toDate();
    let dayExpire = moment(
      ticket.dayExpire.slice(0, 11),
      "DD/MM/YYYY"
    ).toDate();
    let price = ticket.price.slice(0, -8).replaceAll(",", "");
    let priceCombo = ticket.priceCombo.slice(0, -13).replaceAll(",", "");
    let priceComboPer =
      ticket.priceCombo !== "-"
        ? ticket.priceCombo.split("/")[1].slice(0, -3)
        : "";
    let rest = {
      timeApply,
      timeExpire,
      dayApply,
      dayExpire,
      price,
      priceCombo,
      priceComboPer,
    };
    let ticketCurrent = { ...ticket, ...rest };
    setTitle("Cập nhật thông tin gói vé");
    setDataFormAdd((prev: any) => ({
      ...prev,
      ...ticketCurrent,
    }));

    handleOpenModal();
  };
  const handleOpenModalAdd = () => {
    setTitle("Thêm gói vé");
    handleOpenModal();
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setDataFormAdd({
      dayApply: "",
      timeApply: "",
      timeExpire: "",
      dayExpire: "",
      packageCode: packageCode,
      packageName: "",
      priceComboPer: "",
      price: "",
      priceCombo: "",
      status: undefined,
      uiId: 0,
    });
  };
  const handleAdd = () => {
    if (dataFormAdd.packageName !== "") {
      let priceTicket = numberWithCommas(
        Number(dataFormAdd.priceCombo) / Number(dataFormAdd.priceComboPer)
      );
      let dataObj: TicketSetting = {
        status: dataFormAdd.status ? Number(dataFormAdd.status) : -1,
        priceCombo:
          dataFormAdd.priceCombo !== undefined &&
          dataFormAdd.priceComboPer !== undefined
            ? `${stringWithCommas(dataFormAdd.priceCombo)}.000 VNĐ/${
                dataFormAdd.priceComboPer
              } vé`
            : "-",
        price:
          dataFormAdd.price === ""
            ? priceTicket !== "NaN"
              ? `${priceTicket}.000 VNĐ`
              : "-"
            : `${stringWithCommas(dataFormAdd.price)}.000 VNĐ`,
        packageName: dataFormAdd.packageName,
        packageCode: dataFormAdd.packageCode,
        dayApply:
          dataFormAdd.dayApply && dataFormAdd.timeApply
            ? `${moment(dataFormAdd.dayApply).format("DD/MM/YYYY")} ${
                dataFormAdd.timeApply
              }`
            : "-",
        dayExpire:
          dataFormAdd.dayExpire && dataFormAdd.dayExpire
            ? `${moment(dataFormAdd.dayExpire).format("DD/MM/YYYY")} ${
                dataFormAdd.timeExpire
              }`
            : "-",
        uiId: data.length + 1,
      };
      dispatcher(addSettingTicket(dataObj));
      handleWriteDatabase(dataObj.uiId, dataObj);
      closeModal();
    } else {
      toast.warning("Please fill in whole blank");
    }
  };
  const handleUpdateTicket = () => {
    let priceTicket = numberWithCommas(
      Number(dataFormAdd.priceCombo) / Number(dataFormAdd.priceComboPer)
    );
    let dataObj: TicketSetting = {
      status: dataFormAdd.status ? Number(dataFormAdd.status) : -1,
      priceCombo:
        dataFormAdd.priceCombo !== "" && dataFormAdd.priceComboPer !== ""
          ? `${stringWithCommas(dataFormAdd.priceCombo)}.000 VNĐ/${
              dataFormAdd.priceComboPer
            } vé`
          : "-",
      price:
        dataFormAdd.price === ""
          ? priceTicket !== "NaN"
            ? `${priceTicket}.000 VNĐ`
            : "-"
          : `${stringWithCommas(dataFormAdd.price)}.000 VNĐ`,
      packageName: dataFormAdd.packageName,
      packageCode: dataFormAdd.packageCode,
      dayApply:
        dataFormAdd.dayApply && dataFormAdd.timeApply
          ? `${moment(dataFormAdd.dayApply).format("DD/MM/YYYY")} ${
              dataFormAdd.timeApply
            }`
          : "-",

      dayExpire:
        dataFormAdd.dayExpire && dataFormAdd.dayExpire
          ? `${moment(dataFormAdd.dayExpire).format("DD/MM/YYYY")} ${
              dataFormAdd.timeExpire
            }`
          : "-",
      uiId: dataFormAdd.uiId,
    };
    let dataUpdate: TicketSetting[] = data.map((ticket) => {
      if (ticket.uiId === dataFormAdd.uiId) {
        return dataObj;
      } else {
        return ticket;
      }
    });
    // dispatcher Redux
    dispatcher(updateSettingTicket(dataUpdate));
    // update DB
    handleUpdateDb(dataObj);
    closeModal();
  };
  // DB
  const handleUpdateDb = (data: TicketSetting) => {
    const db = getDatabase(app);
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates: any = {};
    updates["/settingTicket/" + data.uiId] = data;
    return update(ref(db), updates);
  };
  const handleWriteDatabase = (id: number, data: TicketSetting) => {
    set(child(dbRef, `settingTicket/` + id), data)
      .then(() => {
        toast.success(`Data saved successfully`);
      })
      .catch((error) => {
        toast.error("The write failed", error);
      });
  };
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
        .catch(() => {
          console.error("No find any data");
        });
    };
    handleReadAllData();
  }, []);
  useEffect(() => {
    setTicketSetting(data);
  }, [data]);

  return (
    <Wrapper className="md:m-10 md:mb-0 md:ml-0 mt-24 p-2 md:p-8 md:pb-12 md:pt-4 md:pl-6 bg-white rounded-3xl">
      <Header
        title="Danh sách gói vé"
        style={{ lineHeight: "123%", fontSize: 36, fontWeight: 700 }}
      />
      <Wrapper className="flex align-center justify-between">
        <Wrapper className="flex align-center relative">
          <Input
            className="search-input router"
            option="router"
            name=""
            disabled
            width={446}
            typeInput=""
            value=""
            placeholder="Tìm bằng số vé"
            handleChange={() => {}}
          />
        </Wrapper>
        <Wrapper className="flex align-center gap-5">
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
              height: 48,
            }}
          />
          <Button
            text="Thêm gói vé"
            icon=""
            bgHoverColor=""
            size={10}
            style={{
              backgroundColor: "#FF993C",
              color: "#FFFFFF",
              border: "1px solid #FF993C",
              fontSize: 18,
              borderRadius: 6,
              height: 48,
            }}
            handleClick={handleOpenModalAdd}
          />
        </Wrapper>
      </Wrapper>
      <DataTable
        columns={columns}
        data={ticketSetting}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
      {modalIsOpen && (
        <ModalSetting
          icon={star}
          checkbox={checkbox}
          title={title}
          packageCode={packageCode}
          dataFormAdd={dataFormAdd}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          handleAdd={handleAdd}
          handleUpdateTicket={handleUpdateTicket}
        />
      )}
    </Wrapper>
  );
};

export default Setting;
