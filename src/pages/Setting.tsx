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
import { getDatabase, ref, get, set, child } from "firebase/database";
import { Button, Header, Input, ModalSetting } from "../components";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { loadSettingTicket, addSettingTicket } from "../redux/dataTicketSlice";
import { SettingTicket, TicketSetting } from "../typeProps/index";
import app from "../database/firebaseConfig";
import { Pagination, settingTicket } from "../mock/dummy";
import moment from "moment";
import { toast } from "react-toastify";
import star from "../assets/icon/star.png";
import update from "../assets/icon/fi_edit.png";
import stringWithCommas from "../utils/stringWithComas";
import numberWithCommas from "../utils/numberWithComas";

type gridStatusSettingProps = {
  handleUpdate: () => void;
};
const gridStatusSetting = ({ handleUpdate }: gridStatusSettingProps) => (
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
  const [input, setInput] = useState<string | undefined>();
  const [inputPrice, setInputPrice] = useState<string>();
  const [inputPriceCombo, setInputPriceCombo] = useState<string>();
  const [inputPriceComboPer, setInputPriceComboPer] = useState<string>();
  const [dayApply, setDayApply] = useState<string>();
  const [timeApply, setTimeApply] = useState<string>();
  const [dayExpire, setDayExpire] = useState<string>();
  const [timeExpire, setTimeExpire] = useState<string>();
  const [checkbox, setCheckbox] = useState<string | undefined>();
  const [selected, setSelected] = useState<string | undefined>();

  const [ticketSetting, setTicketSetting] = useState<
    TicketSetting[] | undefined
  >();
  const editing = { allowDeleting: true, allowEditing: true };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleChangeDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { value } = e.target;
    type === "dateApply"
      ? setDayApply(moment(value).format("DD/MM/YYYY"))
      : setDayExpire(moment(value).format("DD/MM/YYYY"));
  };
  const handleInputPriceCombo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPriceCombo(e.target.value);
  };
  const handleChangeTimer = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    type === "timeApply"
      ? setTimeApply(e.target.value)
      : setTimeExpire(e.target.value);
  };
  const handleInputPriceComboPer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPriceComboPer(e.target.value);
  };
  const handleInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(e.target.value);
  };
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setCheckbox(name);
  };
  const handleUpdate = () => {};
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleAdd = () => {
    if (input !== "") {
      let priceTicket = numberWithCommas(
        Number(inputPriceCombo) / Number(inputPriceComboPer)
      );
      let dataObj: TicketSetting = {
        status: selected ? Number(selected) : -1,
        priceCombo:
          inputPriceCombo !== undefined && inputPriceComboPer !== undefined
            ? `${stringWithCommas(
                inputPriceCombo
              )}.000 VNĐ/${inputPriceComboPer} vé`
            : "-",
        price:
          inputPrice === undefined
            ? priceTicket !== "NaN"
              ? `${priceTicket}.000 VNĐ`
              : "-"
            : `${stringWithCommas(inputPrice)}.000 VNĐ`,
        packageName: input,
        packageCode: "ALT20210501",
        dayApply: dayApply && timeApply ? `${dayApply} ${timeApply}` : "-",
        dayExpire: dayExpire && dayExpire ? `${dayExpire} ${timeExpire}` : "-",
        uiId: data.length + 1,
      };
      dispatcher(addSettingTicket(dataObj));
      handleWriteDatabase(dataObj.uiId, dataObj);
      closeModal();
    } else {
      toast.warning("Please fill in whole blank");
    }
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
    <div className="md:m-10 md:mb-0 md:ml-0 mt-24 p-2 md:p-8 md:pb-12 md:pt-4 md:pl-6 bg-white rounded-3xl">
      <Header
        title="Danh sách gói vé"
        style={{ lineHeight: "123%", fontSize: 36, fontWeight: 700 }}
      />
      <div className="flex align-center justify-between">
        <div className="flex align-center relative">
          <Input
            className="search-input router"
            option="router"
            name=""
            disabled
            typeInput=""
            placeholder="Tìm bằng số vé"
            handleChange={() => {}}
          />
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
            handleClick={handleOpenModal}
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
        load={Pagination}
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
          icon={star}
          checkbox={checkbox}
          title="Thêm gói vé"
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          handleChange={handleChange}
          setSelected={setSelected}
          handleCheckbox={handleCheckbox}
          handleAdd={handleAdd}
          handleInputPriceCombo={handleInputPriceCombo}
          handleChangeTimer={handleChangeTimer}
          handleInputPriceComboPer={handleInputPriceComboPer}
          handleInputPrice={handleInputPrice}
          handleChangeDate={handleChangeDate}
        />
      )}
    </div>
  );
};

export default Setting;
