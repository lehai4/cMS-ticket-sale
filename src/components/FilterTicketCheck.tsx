import iconArrow from "../assets/icon/iconArrow.png";
import { Button, Header, Radio, DatePicker, Wrapper } from ".";

import { FilterTicketCheckProps } from "../typeProps";
const FilterTicketCheck = ({
  radio,
  statusCheck,
  originalTicket,
  setSelected,
  handleChange,
  handleFilter,
  handleChangeDate,
}: FilterTicketCheckProps) => {
  return (
    <Wrapper className="md:m-10 md:mb-0 md:ml-0 mt-24 p-2 md:p-8 md:pb-12 md:pt-4 md:pl-6 bg-white rounded-3xl">
      <Header
        title="Lọc vé"
        style={{
          fontSize: 18,
          lineHeight: "100%",
          fontWeight: 700,
          color: "#1E0D03",
        }}
      />
      <form className="form-ticketCheck">
        <Wrapper className="form-content mt-3">
          <Wrapper className="form-group flex gap-6 mt-1 mb-6">
            <Wrapper className="flex flex-row align-center">
              <select
                name="events"
                id="events"
                className="form-label flex"
                onChange={(e) => setSelected(e.target.value)}
              >
                {originalTicket !== undefined ? (
                  originalTicket
                    .map((ticket) => {
                      return ticket.event;
                    })
                    .filter(
                      (item, i, arrayCurrent) =>
                        arrayCurrent.indexOf(item) === i
                    )
                    .map((item, i) => (
                      <option value={item} key={i} className="form-label">
                        {item}
                      </option>
                    ))
                ) : (
                  <></>
                )}
              </select>
              <img src={iconArrow} alt="" />
            </Wrapper>
          </Wrapper>
          <Wrapper className="form-group flex gap-6 mt-1 mb-4">
            <label className="form-label">Tình trạng đối soát</label>
            <Wrapper className="flex flex-col">
              {statusCheck.map((item, i) => (
                <Wrapper key={i} className="flex align-center mb-4">
                  <Radio
                    id={item.numberRadio}
                    type={item.statusCheck}
                    value={item.id}
                    checked={radio == item.id}
                    handleChange={(e) => handleChange(e, item.statusCheck)}
                  />
                  <label
                    htmlFor={item.numberRadio}
                    className="flex align-center radio-label"
                  >
                    {item.text}
                  </label>
                </Wrapper>
              ))}
            </Wrapper>
          </Wrapper>
          <Wrapper className="form-group flex gap-12 mb-5">
            <label className="form-label">Loại vé</label>
            <Wrapper className="form-label form-type">Vé cổng</Wrapper>
          </Wrapper>
          <Wrapper className="form-group flex flex-col gap-7 mt-8 ">
            <Wrapper className="flex align-center ">
              <label className="form-label">Từ ngày</label>
              <Wrapper className="dateFrom">
                <DatePicker
                  format="dd/MM/yyyy"
                  placholder="dd/mm/yy"
                  className="dateForm"
                  handleChangeDate={(e) => handleChangeDate(e, "dayFrom")}
                />
              </Wrapper>
            </Wrapper>
            <Wrapper className="flex align-center">
              <label className="form-label">Đến ngày</label>
              <Wrapper className="dateTo">
                <DatePicker
                  format="dd/MM/yyyy"
                  placholder="dd/mm/yy"
                  className=""
                  handleChangeDate={(e) => handleChangeDate(e, "dayTo")}
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper className="flex align-center justify-center gap-5 mt-8">
          <Button
            text="Lọc"
            size={10}
            handleClick={handleFilter}
            bgHoverColor=""
            icon=""
            style={{
              backgroundColor: "#FFFFFF",
              color: "#FF993C",
              border: "1px solid #FF993C",
              borderRadius: 6,
              fontSize: 18,
              width: 160,
              height: 48,
            }}
          />
        </Wrapper>
      </form>
    </Wrapper>
  );
};

export default FilterTicketCheck;
