import React, { useState } from "react";

const EditableText = ({ text, onChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const handleSubmit = () => {
    setEditMode(false);
    onChange(inputValue);
  };

  return editMode ? (
    <span>
      <input value={inputValue} onChange={e => setInputValue(e.target.value)} />{" "}
      <button onClick={handleSubmit}>Ok</button>
    </span>
  ) : (
    <span
      onClick={() => {
        setEditMode(true);
        setInputValue(text);
      }}
    >
      {text}
    </span>
  );
};

export default EditableText;
