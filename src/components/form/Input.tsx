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
            placeholder={`${placeholder}`}
            style={{ width }}
            className={className}
          />
          <span className="btn-search  absolute">
            <img src={`${searchIcon}`} alt="" />
          </span>
        </>
      ) : option == "router" ? (
        <>
          <input
            type="text"
            name={name}
            style={{ width }}
            placeholder={`${placeholder}`}
            className={className}
          />
          <span className="btn-search absolute">
            <img src={`${searchIcon}`} alt="" />
          </span>
        </>
      ) : (
        <input
          type={typeInput !== "" ? typeInput : "text"}
          name={name}
          value={value !== "" ? value : undefined}
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
