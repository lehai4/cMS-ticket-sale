import React from "react";
import Modal from "react-modal";
import { Button, Header, Input, Date, Timer, Checkbox } from "../index";
import iconArrow from "../../assets/icon/iconArrow.png";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
  handleChangeDate: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
  handleAdd: () => void;
  closeModal: () => void;
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
  handleChangeDate,
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
          <div className="form-header">
            <Header
              title={title}
              style={{
                fontWeight: 700,
                fontSize: 26,
                lineHeight: "103%",
                color: "#1E0D03",
              }}
            />
          </div>
          <div className="form-content">
            {title === "Thêm gói vé" ? (
              <div className="form-group mt-6">
                <label className="form-label flex align-center gap-1">
                  Tên gói vé <img src={`${icon}`} alt="" />
                </label>
                <Input
                  name="name"
                  option=""
                  className="form-control"
                  placeholder="Nhập tên gói vé"
                  handleChange={handleChange}
                />
              </div>
            ) : (
              <div className="form-group">
                <div>
                  <label>
                    Mã sự kiện <img src={`${icon}`} alt="" />
                  </label>
                  <Input
                    name="name"
                    option=""
                    className="form-control"
                    placeholder="Nhập mã sự kiện"
                    handleChange={() => {}}
                  />
                </div>
                <div>
                  <label className="form-label">Tên sự kiện</label>
                  <Input
                    name="name"
                    option=""
                    className="form-control"
                    placeholder="Hội chợ triễn lãm hàng tiêu dùng 2021"
                    handleChange={() => {}}
                  />
                </div>
              </div>
            )}
            <div className="form-group flex gap-9 mt-1 mb-6">
              <div>
                <label className="form-label">Ngày áp dụng</label>
                <div className="flex align-center gap-2 mt-2">
                  <Date
                    typeDate=""
                    className=""
                    handleChangeDate={(e) => handleChangeDate(e, "dateApply")}
                  />
                  <Timer typeTimer="" handleChangeTime={() => {}} step={1} />
                </div>
              </div>
              <div>
                <label className="form-label">Ngày hết hạn</label>
                <div className="flex align-center gap-2 mt-2">
                  <Date
                    typeDate=""
                    className=""
                    handleChangeDate={(e) => handleChangeDate(e, "dateExpire")}
                  />
                  <Timer typeTimer="" handleChangeTime={() => {}} step={1} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="mb-2">
                <label className="form-label" htmlFor="">
                  Giá vé áp dụng
                </label>
              </div>
              <div className="mb-3 flex align-center">
                <Checkbox
                  id={""}
                  type="checkbox"
                  name="vé lẻ"
                  isChecked={checkbox === "vé lẻ" ? true : false}
                  handleClick={(e) => handleCheckbox(e, "vé lẻ")}
                />
                <span className="ml-2">Vé lẻ (vnđ/vé) với giá</span>
                <Input
                  option=""
                  className="price m-2.5 mt-0 mb-0"
                  name=""
                  handleChange={() => {}}
                  placeholder="Giá vé"
                />
                <span>/ vé</span>
              </div>
              <div className="flex align-center">
                <Checkbox
                  id={""}
                  type="checkbox"
                  name="combo"
                  isChecked={checkbox === "combo" ? true : false}
                  handleClick={(e) => handleCheckbox(e, "combo")}
                />
                <span className="ml-2">Combo vé với giá</span>
                <Input
                  option=""
                  className="price m-2.5 mt-0 mb-0"
                  name=""
                  handleChange={() => {}}
                  placeholder="Giá vé"
                />
                <span>/</span>
                <Input
                  option=""
                  className="price m-2.5 mt-0 mb-0"
                  name=""
                  handleChange={() => {}}
                  placeholder="Giá vé"
                />
                <span>vé</span>
              </div>
            </div>
            <div className="form-group mt-5">
              <div className="mb-2">
                <label className="form-label">Tình trạng</label>
              </div>
              <div className="mb-3 flex align-center option">
                <select
                  className="select-css"
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="0">Lựa chọn</option>
                  <option value="apply">Đang áp dụng</option>
                  <option value="turn-off">Tắt</option>
                </select>
                <img src={iconArrow} alt="" />
              </div>
            </div>
            <div className="form-group mt-4 mb-5 ml-0 mr-0">
              <label className="form-note flex align-center">
                <img src={`${icon}`} alt="" />
                <span className="ml-1">là thông tin bắt buộc</span>
              </label>
            </div>
          </div>

          <div className="flex align-center justify-center gap-5">
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
              handleClick={handleAdd}
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
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalSetting;
