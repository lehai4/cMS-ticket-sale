import searchIcon from "../../assets/icon/search.png";
type InputProps = {
  placeholder: string;
  type: string;
};
const Input = ({ placeholder, type }: InputProps) => {
  return (
    <>
      {type == "navbar" ? (
        <>
          <input
            title="search"
            type="text"
            name="text"
            placeholder={`${placeholder}`}
            className="search-input navbar"
          />
          <span className="btn-search  absolute">
            <img src={`${searchIcon}`} alt="" />
          </span>
        </>
      ) : (
        <>
          <input
            title="search"
            type="text"
            name="text"
            placeholder={`${placeholder}`}
            className="search-input router"
          />
          <span className="btn-search absolute">
            <img src={`${searchIcon}`} alt="" />
          </span>
        </>
      )}
    </>
  );
};

export default Input;
