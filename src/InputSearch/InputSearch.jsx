import { Input } from "@chakra-ui/react";

function InputSearch() {
  return (
    <div>
      <p>Search by folders or files</p>
      <Input placeholder="Type names.." size="sm" />
    </div>
  );
}

export default InputSearch;
