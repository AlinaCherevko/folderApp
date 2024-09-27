import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./Form.module.css";

function Form({ setValue, addNewContent, setIsShownInfoPanel }) {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue, setValue]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setValue(inputValue);

    addNewContent();
    setInputValue("");
    setIsShownInfoPanel(false);
  };

  return (
    <form className={style.form} onSubmit={onFormSubmit}>
      <Input placeholder="Type new name.." size="xs" onChange={onInputChange} />
      <Button type="submit" size="xs">
        Add
      </Button>
    </form>
  );
}

Form.propTypes = {
  setValue: PropTypes.func,
  addNewContent: PropTypes.func,
  setIsShownInfoPanel: PropTypes.func,
};

export default Form;
