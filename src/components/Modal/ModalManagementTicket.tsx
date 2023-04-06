import Modal from "react-modal";
import { Button, Header, Checkbox } from "../index";
import { ModalManagementTicket } from "../../configType";

const ModalManagerTicket = (props: ModalManagementTicket) => {
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

  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form className="form-managementTicket">
          <div className="form-header">
            <Header
              title={props.title}
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1E0D03",
                lineHeight: "103%",
              }}
            />
          </div>
          <div className="form-content mt-8">
            <div className="form-group flex gap-6 mt-1 mb-5">
              <div>
                <label className="form-label">Từ ngày</label>
                <div className="flex align-center gap-2 mt-2 ">
                  <input
                    type="date"
                    onChange={(e) => props.handleChangeDate(e, "dayPrev")}
                  />
                </div>
              </div>
              <div className="ml-20">
                <label className="form-label">Đến ngày</label>
                <div className="flex align-center gap-2 mt-2">
                  <input
                    type="date"
                    onChange={(e) => props.handleChangeDate(e, "dayNext")}
                  />
                </div>
              </div>
            </div>
            <div className="form-group mt-1">
              <div className="mb-3">
                <label className="form-label">Tình trạng sử dụng</label>
              </div>
              <div className="flex align-center justify-between mb-2 ">
                {props.statusUse.map((item, i) => (
                  <div className="flex" key={i}>
                    <input
                      id={item.numberRadio}
                      type="radio"
                      value={item.id}
                      checked={props.radio == item.id}
                      onChange={(e) => props.handleChange(e, item.statusTicket)}
                    />
                    <label
                      htmlFor={item.numberRadio}
                      className="flex align-center radio-label"
                    >
                      {item.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group mt-5">
              <div className="mb-2">
                <label className="form-label">Cổng Check - in</label>
              </div>
              <div className="mb-3">
                <div className="flex align-center flex-wrap">
                  <div className="flex align-center check-in">
                    <Checkbox
                      type="checkbox"
                      name="selectAll"
                      id="0"
                      handleClick={(e) => props.handleSelectAll(e)}
                      isChecked={props.isCheckAll}
                    />
                    <span className="ml-2">Tất cả</span>
                  </div>
                  {props.statusCheckIn.map((item, i) => (
                    <div className="flex align-center check-in" key={i}>
                      <Checkbox
                        type="checkbox"
                        name={item.name}
                        id={item.id.toString()}
                        handleClick={(e) => props.handleClick(e, item.name)}
                        isChecked={props.isCheck.includes(item.name.toString())}
                      />
                      <span className="ml-2">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex align-center justify-center gap-5 mt-8">
            <Button
              text="Lọc"
              size={10}
              handleClick={props.handleFilterModal}
              icon={""}
              bgHoverColor=""
              style={{
                width: "180px",
                gap: 0,
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

export default ModalManagerTicket;