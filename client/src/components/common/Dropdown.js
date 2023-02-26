import React, { useState } from "react";

const Dropdown = (props) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    props.onDropdownChange(e.target.value);
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      <option value="">Select an option</option>
      {props.options.map((option) => (
        <option key={option.text} value={option.text}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
