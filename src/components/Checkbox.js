import React from "react";
import styles from "./Checkbox.module.css"

const Checkbox = ({ checked, onChange }) => {
  return (
    <input
      className={styles.Checkbox}
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
    />
  );
};

export default Checkbox;
