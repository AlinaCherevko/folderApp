import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function InputSearch({ setQuery }) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setQuery(searchValue);
  }, [searchValue]);

  const onSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <p>Search by folders or files</p>
      <Input placeholder="Type names.." size="sm" onChange={onSearchInput} />
    </div>
  );
}
InputSearch.propTypes = {
  setQuery: PropTypes.func,
};

export default InputSearch;
