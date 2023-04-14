import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";
type DatePickerProps = {
  handleChangeDate: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
  format: string;
  placholder: string;
  className: string;
  value: string;
};
const DatePicker = ({
  handleChangeDate,
  format,
  placholder,
  className,
  value,
}: DatePickerProps) => {
  let currentDate = moment(value).toDate();
  return (
    <DatePickerComponent
      format={format}
      value={currentDate}
      placeholder={placholder}
      className={className ? className : "default"}
      onChange={(e: React.ChangeEvent<HTMLInputElement>, type: string) =>
        handleChangeDate(e, type)
      }
    ></DatePickerComponent>
  );
};

export default DatePicker;
