import searchIcon from "../../assets/icon/search.png";
type InputProps = {
  placeholder: string;
  name: string;
  option: string;
  className: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({
  placeholder,
  name,
  option,
  className,
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
            placeholder={`${placeholder}`}
            className={className}
          />
          <span className="btn-search absolute">
            <img src={`${searchIcon}`} alt="" />
          </span>
        </>
      ) : (
        <input
          type="text"
          name={name}
          placeholder={`${placeholder}`}
          className={className != "" ? className : ""}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default Input;
