import {
  Header,
  AreaCharts,
  Wrapper,
  DoughnutChart,
  Helmet,
} from "../components";
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import ticketNoUse from "../assets/icon/eventPackage.png";
import ticketUse from "../assets/icon/familyPackage.png";
const Home = () => {
  const revenue = 525145000;
  const revenueFinal = revenue.toLocaleString("vi", {
    maximumSignificantDigits: 6,
  });
  const eventPackage = [
    { name: "Vé đã sử dụng", value: 30256, img: ticketUse },
    { name: "Vẽ chưa sử dụng", value: 28302, img: ticketNoUse },
  ];
  const familyPackage = [
    { name: "Vé đã sử dụng", value: 56024, img: ticketUse },
    { name: "Vẽ chưa sử dụng", value: 13568, img: ticketNoUse },
  ];
  return (
    <Wrapper className="md:m-10 md:mb-0 md:ml-0 mt-24 p-2 md:p-8 md:pb-12 md:pt-4 md:pl-6 bg-white rounded-3xl">
      <Helmet title="Trang chủ">
        <Header
          title={"Thống kê"}
          style={{
            fontWeight: "700",
            fontSize: "36px",
            lineHeight: "123%",
            fontFamily: "Montserrat",
          }}
        />
        <Wrapper className="flex justify-between align-center md:mr-7">
          <Header
            title={"Danh thu"}
            style={{
              fontWeight: "700",
              fontSize: "18px",
              lineHeight: "128%",
              marginBottom: "5px",
              fontFamily: "Montserrat",
            }}
          />
          {/* <DatePickerComponent
            format="MM/yyyy"
            placeholder="mm/yy"
            className="default"
            start="Year"
            depth="Year"
          /> */}
        </Wrapper>
        <AreaCharts />
        <Wrapper className="revenue md:mt-10">
          <p className="revenue-define">Tổng doanh thu theo tuần</p>
          <Wrapper className="flex align-center md:mt-2 md:mb-2">
            <span className="revenue-total">{revenueFinal}</span>
            <span className="revenue-unit ml-1">đồng</span>
          </Wrapper>
        </Wrapper>
        <Wrapper className="circle-content flex flex-row">
          <Wrapper className="circle-content-calender">
            {/* <DatePickerComponent
              format="MM/yyyy"
              placeholder="mm/yy"
              className="default"
              start="Year"
              depth="Year"
            /> */}
          </Wrapper>
          <Wrapper className="circle-content-chart">
            <DoughnutChart data={familyPackage} title="Gói gia đình" />
          </Wrapper>
          <Wrapper className="circle-content-chart ">
            <DoughnutChart data={eventPackage} title="Gói sự kiện" />
          </Wrapper>
          <Wrapper className="circle-content-note md:mt-12">
            <Wrapper className="flex flex-col">
              {eventPackage?.map((item, index) => (
                <Wrapper className="flex flex-row md:mb-4" key={index}>
                  <img src={item.img} alt={item.name} />
                  <span className="text-slate-900 font-medium md:ml-2">
                    {item.name}
                  </span>
                </Wrapper>
              ))}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Helmet>
    </Wrapper>
  );
};

export default Home;
