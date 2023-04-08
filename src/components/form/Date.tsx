type DateProps = {
  typeDate: string;
  className: string;
  handleChangeDate: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string | number
  ) => void;
};
const Date = ({ typeDate, className, handleChangeDate }: DateProps) => {
  return (
    <input
      type="date"
      className={className ? className : ""}
      onChange={(e) => handleChangeDate(e, typeDate)}
    />
  );
};

export default Date;
