import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";

function RadioBtnsSection({ setRole, userRole }) {
  const onBtnChange = (value) => {
    setRole(value);
  };

  return (
    <div>
      <RadioGroup onChange={onBtnChange} value={userRole}>
        <Stack direction="row">
          <Radio value="Admin">Admin</Radio>
          <Radio value="User">User</Radio>
        </Stack>
      </RadioGroup>
    </div>
  );
}

RadioBtnsSection.propTypes = {
  setRole: PropTypes.func,
  userRole: PropTypes.string,
};

export default RadioBtnsSection;
