import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
type DatePickerProps = {
  handleChangeDate: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
  format: string;
  placholder: string;
  className: string;
};
const DatePicker = ({
  handleChangeDate,
  format,
  placholder,
  className,
}: DatePickerProps) => {
  return (
    <DatePickerComponent
      format={format}
      placeholder={placholder}
      className={className ? className : "default"}
      onChange={(e: React.ChangeEvent<HTMLInputElement>, type: string) =>
        handleChangeDate(e, type)
      }
    ></DatePickerComponent>
  );
};

export default DatePicker;
