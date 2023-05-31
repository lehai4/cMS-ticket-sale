import Modal from "react-modal";
import u_angleDown from "../../assets/icon/u_angle-down.png";
import { ModalSettingProps } from "../../typeProps";
import {
  Button,
  Checkbox,
  DatePickers,
  Header,
  Input,
  Timer,
  Wrapper,
} from "../index";
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
const ModalSetting = ({
  title,
  modalIsOpen,
  icon,
  dataFormAdd,
  closeModal,
  handleChange,
  handleAdd,
  handleUpdateTicket,
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
                  name="packageName"
                  option=""
                  width={367}
                  value={dataFormAdd.packageName}
                  typeInput=""
                  disabled={false}
                  className="form-control"
                  placeholder="Nhập tên gói vé"
                  handleChange={(e) => handleChange(e, "", "")}
                />
              </Wrapper>
            ) : (
              <Wrapper className="form-group flex flex-row justify-between gap-90">
                <Wrapper className="flex flex-col">
                  <label className="form-label flex gap-1">
                    Mã sự kiện <img src={`${icon}`} alt="" />
                  </label>
                  <Input
                    name="packageCode"
                    option=""
                    disabled={false}
                    width={245}
                    typeInput=""
                    value={dataFormAdd.packageCode}
                    className="form-control"
                    placeholder="Nhập mã sự kiện"
                    handleChange={(e) => handleChange(e, "", "")}
                  />
                </Wrapper>
                <Wrapper className="flex flex-col">
                  <label className="form-label">Tên sự kiện</label>
                  <Input
                    name="packageName"
                    width={355}
                    option=""
                    value={dataFormAdd.packageName}
                    typeInput=""
                    disabled={false}
                    className="form-control"
                    placeholder="Nhập tên sự kiện"
                    handleChange={(e) => handleChange(e, "", "")}
                  />
                </Wrapper>
              </Wrapper>
            )}
            <Wrapper className="form-group flex gap-10 mt-2 mb-6">
              <Wrapper className="">
                <label className="form-label">Ngày áp dụng</label>
                <Wrapper className="flex align-center gap-4 mt-2">
                  <Wrapper className="flex flex-row items-center">
                    <DatePickers
                      valueStart={dataFormAdd.dayApply}
                      valueEnd={undefined}
                      showIcon={true}
                      placeholder="dd/mm/yy"
                      isRange={false}
                      setValueStart={(date: Date) =>
                        handleChange(date, "", "apply")
                      }
                      setValueEnd={() => {}}
                    />
                  </Wrapper>
                  <Timer
                    name="timeApply"
                    value={dataFormAdd.timeApply}
                    handleChangeTime={(e) => handleChange(e, "", "")}
                    step={1}
                  />
                </Wrapper>
              </Wrapper>
              <Wrapper className="">
                <label className="form-label">Ngày hết hạn</label>
                <Wrapper className="flex align-center gap-4 mt-2">
                  <Wrapper className="flex flex-row items-center">
                    <DatePickers
                      valueStart={dataFormAdd.dayExpire}
                      valueEnd={undefined}
                      showIcon={true}
                      placeholder="dd/mm/yy"
                      isRange={false}
                      setValueStart={(date: Date) =>
                        handleChange(date, "", "expire")
                      }
                      setValueEnd={() => {}}
                    />
                  </Wrapper>
                  <Timer
                    name="timeExpire"
                    value={dataFormAdd.timeExpire}
                    handleChangeTime={(e) => handleChange(e, "", "")}
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
                  name="checkbox"
                  isChecked={
                    dataFormAdd.type === "odd" &&
                    dataFormAdd.checkbox === "true"
                      ? true
                      : false
                  }
                  handleClick={(e) => handleChange(e, "odd", "")}
                />
                <span className="ml-2">Vé lẻ (vnđ/vé) với giá</span>
                <Input
                  option=""
                  width={148}
                  name="price"
                  value={dataFormAdd.price}
                  disabled={dataFormAdd.type === "combo" ? true : false}
                  className="price m-2.5 mt-0 mb-0"
                  typeInput="number"
                  handleChange={(e) => handleChange(e, "odd", "")}
                  placeholder="Giá vé"
                />
                <span>/ vé</span>
              </Wrapper>
              <Wrapper className="flex align-center">
                <Checkbox
                  id={""}
                  type="checkbox"
                  name="checkbox"
                  isChecked={
                    dataFormAdd.type === "combo" &&
                    dataFormAdd.checkbox === "true"
                      ? true
                      : false
                  }
                  handleClick={(e) => handleChange(e, "combo", "")}
                />
                <span className="ml-2">Combo vé với giá</span>
                <Input
                  option=""
                  className="price m-2.5 mt-0 mb-0"
                  width={148}
                  value={dataFormAdd.priceCombo}
                  name="priceCombo"
                  disabled={dataFormAdd.type === "odd" ? true : false}
                  typeInput="number"
                  handleChange={(e) => handleChange(e, "combo", "")}
                  placeholder="Giá vé"
                />
                <span>/</span>
                <Input
                  option=""
                  className="price price-per m-2.5 mt-0 mb-0"
                  name="priceComboPer"
                  value={dataFormAdd.priceComboPer}
                  width={85}
                  disabled={dataFormAdd.type === "odd" ? true : false}
                  typeInput="number"
                  handleChange={(e) => handleChange(e, "combo", "")}
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
                  name="status"
                  value={dataFormAdd.status}
                  onChange={(e) => handleChange(e, "", "")}
                >
                  <option value="undefined">Lựa chọn</option>
                  <option value="1">Đang áp dụng</option>
                  <option value="-1">Tắt</option>
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
                title === "Thêm gói vé" ? handleAdd : handleUpdateTicket
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
