import searchIcon from "../../assets/icon/search.png";
type InputProps = {
  placeholder: string;
  name: string;
  disabled: boolean;
  option: string;
  typeInput: string;
  value: string | undefined;
  className: string;
  width: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({
  placeholder,
  name,
  option,
  typeInput,
  disabled,
  className,
  width,
  value,
  handleChange,
}: InputProps) => {
  return (
    <>
      {option == "navbar" ? (
        <>
          <input
            type="text"
            name={name}
            value=""
            disabled={disabled}
            placeholder={`${placeholder}`}
            style={{ width }}
            className={className}
            onChange={() => {}}
          />
          <span className="btn-search  absolute">
            <img src={`${searchIcon}`} alt="" />
          </span>
        </>
      ) : option == "router" ? (
        <>
          <input
            type="text"
            value=""
            name={name}
            disabled={disabled}
            style={{ width }}
            placeholder={`${placeholder}`}
            className={className}
            onChange={() => {}}
          />
          <span className="btn-search absolute">
            <img src={`${searchIcon}`} alt="" />
          </span>
        </>
      ) : (
        <input
          type={typeInput !== "" ? typeInput : "text"}
          name={name}
          value={value}
          style={{ width }}
          disabled={disabled}
          placeholder={`${placeholder}`}
          className={className != "" ? className : ""}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default Input;
