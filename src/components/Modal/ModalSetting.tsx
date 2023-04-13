import React from "react";
import Modal from "react-modal";
import {
  Button,
  Header,
  Input,
  Timer,
  Checkbox,
  DatePicker,
  Wrapper,
} from "../index";
import u_angleDown from "../../assets/icon/u_angle-down.png";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "16px",
    border: "1px solid rgba(0,0,0,0.3)",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
type ModalSettingProps = {
  title: string;
  checkbox: string | undefined;
  icon: string;
  modalIsOpen: boolean;
  setSelected: (value: string) => void;
  handleAdd: () => void;
  handleUpdateTicket: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputPriceCombo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputPriceComboPer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
  handleChangeTimer: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
};
const ModalSetting = ({
  title,
  modalIsOpen,
  icon,
  checkbox,
  closeModal,
  setSelected,
  handleCheckbox,
  handleChange,
  handleAdd,
  handleUpdateTicket,
  handleChangeDate,
  handleInputPrice,
  handleInputPriceComboPer,
  handleChangeTimer,
  handleInputPriceCombo,
}: ModalSettingProps) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form className="form-setting">
          <Wrapper className="form-header">
            <Header
              title={title}
              style={{
                fontWeight: 700,
                fontSize: 26,
                lineHeight: "103%",
                color: "#1E0D03",
              }}
            />
          </Wrapper>
          <Wrapper className="form-content">
            {title === "Thêm gói vé" ? (
              <Wrapper className="form-group mt-8">
                <label className="form-label flex gap-1">
                  Tên gói vé <img src={`${icon}`} alt="" />
                </label>
                <Input
                  name="name"
                  option=""
                  width={367}
                  typeInput=""
                  disabled={false}
                  className="form-control"
                  placeholder="Nhập tên gói vé"
                  handleChange={handleChange}
                />
              </Wrapper>
            ) : (
              <Wrapper className="form-group flex flex-row justify-between gap-90">
                <Wrapper className="flex flex-col">
                  <label className="form-label flex gap-1">
                    Mã sự kiện <img src={`${icon}`} alt="" />
                  </label>
                  <Input
                    name="name"
                    option=""
                    disabled
                    width={245}
                    typeInput=""
                    className="form-control"
                    placeholder="Nhập mã sự kiện"
                    handleChange={() => {}}
                  />
                </Wrapper>
                <Wrapper className="flex flex-col">
                  <label className="form-label">Tên sự kiện</label>
                  <Input
                    name="name"
                    width={367}
                    option=""
                    typeInput=""
                    disabled
                    className="form-control"
                    placeholder="Nhập tên sự kiện"
                    handleChange={() => {}}
                  />
                </Wrapper>
              </Wrapper>
            )}
            <Wrapper className="form-group flex gap-9 mt-2 mb-6">
              <Wrapper className="">
                <label className="form-label">Ngày áp dụng</label>
                <Wrapper className="flex align-center gap-2 mt-2">
                  <DatePicker
                    format="dd/MM/yyyy"
                    placholder="dd/mm/yy"
                    className="date"
                    handleChangeDate={(e) => handleChangeDate(e, "dateApply")}
                  />
                  <Timer
                    typeTimer=""
                    handleChangeTime={(e) => handleChangeTimer(e, "timeApply")}
                    step={1}
                  />
                </Wrapper>
              </Wrapper>
              <Wrapper className="">
                <label className="form-label">Ngày hết hạn</label>
                <Wrapper className="flex align-center gap-2 mt-2">
                  <DatePicker
                    format="dd/MM/yyyy"
                    placholder="dd/mm/yy"
                    className="date"
                    handleChangeDate={(e) => handleChangeDate(e, "dateExpire")}
                  />
                  <Timer
                    typeTimer=""
                    handleChangeTime={(e) => handleChangeTimer(e, "timeExpire")}
                    step={1}
                  />
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper className="form-group">
              <Wrapper className="mb-2">
                <label className="form-label" htmlFor="">
                  Giá vé áp dụng
                </label>
              </Wrapper>
              <Wrapper className="mb-3 flex align-center">
                <Checkbox
                  id={""}
                  type="checkbox"
                  name="vé lẻ"
                  isChecked={checkbox === "vé lẻ" ? true : false}
                  handleClick={(e) => handleCheckbox(e)}
                />
                <span className="ml-2">Vé lẻ (vnđ/vé) với giá</span>
                <Input
                  option=""
                  width={148}
                  name=""
                  disabled={checkbox === "combo" ? true : false}
                  className="price m-2.5 mt-0 mb-0"
                  typeInput="number"
                  handleChange={handleInputPrice}
                  placeholder="Giá vé"
                />
                <span>/ vé</span>
              </Wrapper>
              <Wrapper className="flex align-center">
                <Checkbox
                  id={""}
                  type="checkbox"
                  name="combo"
                  isChecked={checkbox === "combo" ? true : false}
                  handleClick={(e) => handleCheckbox(e)}
                />
                <span className="ml-2">Combo vé với giá</span>
                <Input
                  option=""
                  className="price m-2.5 mt-0 mb-0"
                  width={148}
                  name=""
                  disabled={checkbox === "vé lẻ" ? true : false}
                  typeInput="number"
                  handleChange={handleInputPriceCombo}
                  placeholder="Giá vé"
                />
                <span>/</span>
                <Input
                  option=""
                  className="price price-per m-2.5 mt-0 mb-0"
                  name=""
                  width={85}
                  disabled={checkbox === "vé lẻ" ? true : false}
                  typeInput="number"
                  handleChange={handleInputPriceComboPer}
                  placeholder="Giá vé"
                />
                <span>vé</span>
              </Wrapper>
            </Wrapper>
            <Wrapper className="form-group mt-5">
              <Wrapper className="mb-2">
                <label className="form-label">Tình trạng</label>
              </Wrapper>
              <Wrapper className="mb-3 flex align-center option">
                <select
                  className="select-css"
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="undefined">Lựa chọn</option>
                  <option value="1">Đang áp dụng</option>
                  <option value="0">Tắt</option>
                </select>
                <img src={u_angleDown} alt="" />
              </Wrapper>
            </Wrapper>
            <Wrapper className="form-group mt-4 mb-5 ml-0 mr-0">
              <label className="label-note flex align-center">
                <img src={`${icon}`} alt="" />
                <span className="ml-1">là thông tin bắt buộc</span>
              </label>
            </Wrapper>
          </Wrapper>

          <Wrapper className="flex align-center justify-center gap-5">
            <Button
              text="Hủy"
              size={10}
              handleClick={closeModal}
              icon={""}
              bgHoverColor=""
              style={{
                gap: 12,
                height: 48,
                width: 160,
                border: "1px solid #FF993C",
                color: "#FF993C",
                fontSize: "18px",
                borderRadius: "6px",
                backgroundColor: "#FFFFFF",
              }}
            />
            <Button
              text="Lưu"
              size={10}
              handleClick={
                title === "Thêm gói vé" ? handleAdd : () => handleUpdateTicket
              }
              icon={""}
              bgHoverColor=""
              style={{
                gap: 12,
                height: 48,
                width: 160,
                border: "1px solid #FF993C",
                color: "#FFFFFF",
                fontSize: "18px",
                borderRadius: "6px",
                backgroundColor: "#FF993C",
              }}
            />
          </Wrapper>
        </form>
      </Modal>
    </div>
  );
};

export default ModalSetting;
