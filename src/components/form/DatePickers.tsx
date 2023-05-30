import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
type DatePickerProps = {
  valueStart: Date | undefined;
  valueEnd: Date | undefined;
  placeholder: string;
  showIcon: boolean;
  isRange: boolean;
  setValueStart: (value: Date) => void;
  setValueEnd: (value: Date) => void;
};

const DatePickers = (props: DatePickerProps) => {
  return (
    <>
      {!props.isRange ? (
        <DatePicker
          dateFormat="dd/MM/yyyy"
          startDate={props.valueStart}
          showIcon={props.showIcon}
          selected={props.valueStart}
          placeholderText={props.placeholder}
          onChange={(date: Date) => props.setValueStart(date)}
        />
      ) : (
        <>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selectsStart
            showIcon={props.showIcon}
            selected={props.valueStart}
            onChange={(date: Date) => props.setValueStart(date)}
          />
          <ArrowRightIcon />
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={props.valueEnd}
            onChange={(date: Date) => props.setValueEnd(date)}
            selectsEnd
            startDate={props.valueStart}
            endDate={props.valueEnd}
            showIcon={props.showIcon}
            minDate={props.valueStart}
          />
        </>
      )}
    </>
  );
};

export default DatePickers;
