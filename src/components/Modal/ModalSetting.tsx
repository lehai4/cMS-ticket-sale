import React from "react";
import Modal from "react-modal";
import { Button, Header } from "../index";
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
  icon: string;
  modalIsOpen: boolean;
  closeModal: () => void;
};
const ModalSetting = ({
  title,
  modalIsOpen,
  icon,
  closeModal,
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
          <div className="form-content mt-3">
            {title === "Thêm gói vé" ? (
              <div className="form-group">
                <label className="form-label flex align-center gap-1">
                  Tên gói vé <img src={`${icon}`} alt="" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Nhập tên gói vé"
                />
              </div>
            ) : (
              <div className="form-group">
                <div>
                  <label>
                    Mã sự kiện <img src={`${icon}`} alt="" />
                  </label>
                  <input placeholder="Nhập tên gói vé" />
                </div>
                <div>
                  <label className="form-label">Tên sự kiện</label>
                  <input placeholder="Hội chợ triễn lãm hàng tiêu dùng 2021" />
                </div>
              </div>
            )}
            <div className="form-group flex gap-9 mt-1 mb-6">
              <div>
                <label className="form-label">Ngày áp dụng</label>
                <div className="flex align-center gap-2 mt-2">
                  <input type="date" placeholder="mm/dd/yy" />
                  <input type="text" placeholder="hh:mm:ss" />
                </div>
              </div>
              <div>
                <label className="form-label">Ngày hết hạn</label>
                <div className="flex align-center gap-2 mt-2">
                  <input type="date" />
                  <input type="text" placeholder="hh:mm:ss" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="mb-2">
                <label className="form-label">Giá vé áp dụng</label>
              </div>
              <div className="mb-3 flex align-center">
                <input type="checkbox" />
                <span className="ml-2">Vé lẻ (vnđ/vé) với giá</span>
                <input className="price m-2.5 mt-0 mb-0" placeholder="Giá vé" />
                <span>/ vé</span>
              </div>
              <div className="flex align-center">
                <input type="checkbox" />
                <span className="ml-2">Combo vé với giá</span>
                <input className="price m-2.5 mt-0 mb-0" placeholder="Giá vé" />
                <span>/</span>
                <input
                  className="price price-override m-2.5 mt-0 mb-0"
                  placeholder="Giá vé"
                />
                <span>vé</span>
              </div>
            </div>
            <div className="form-group mt-5">
              <div className="mb-2">
                <label className="form-label">Tình trạng</label>
              </div>
              <div className="mb-3">
                <select className="select-css">
                  <option value="0">Lựa chọn</option>
                  <option value="apply">Đang áp dụng</option>
                  <option value="turn-off">Tắt</option>
                </select>
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
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalSetting;
