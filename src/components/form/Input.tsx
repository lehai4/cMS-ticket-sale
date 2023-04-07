import searchIcon from "../../assets/icon/search.png";
type InputProps = {
  placeholder: string;
  type: string;
  name: string;
  option: string;
};
const Input = ({ placeholder, type, name, option }: InputProps) => {
  return (
    <>
      {option == "navbar" ? (
        <>
          <input
            type={type}
            name={name}
            placeholder={`${placeholder}`}
            className="search-input navbar"
          />
          <span className="btn-search  absolute">
            <img src={`${searchIcon}`} alt="" />
          </span>
        </>
      ) : option == "router" ? (
        <>
          <input
            type={type}
            name={name}
            placeholder={`${placeholder}`}
            className="search-input router"
          />
          <span className="btn-search absolute">
            <img src={`${searchIcon}`} alt="" />
          </span>
        </>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={`${placeholder}`}
          className="search-input router"
        />
      )}
    </>
  );
};

export default Input;
