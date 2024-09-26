import { Input } from "@chakra-ui/react";
import { useState } from "react";

function InputSearch() {
  const [searchValue, setSearchValue] = useState("");

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

export default InputSearch;
