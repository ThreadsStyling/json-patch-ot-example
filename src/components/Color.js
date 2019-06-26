import React from "react";
import debounce from "lodash.debounce";

const Color = ({ color, onChange }) => {
  const debouncedChange = debounce(onChange, 100);
  return (
    <input
      type="color"
      value={color}
      onChange={e => debouncedChange(e.target.value)}
    />
  );
};

export default Color;
