import React from "react";
import EditableText from "./EditableText";
import Checkbox from "./Checkbox";
import styles from "./Book.module.css";
import Color from "./Color";

const Book = ({
  onMoveUp,
  onMoveDown,
  onDelete,
  onAddAfter,
  title,
  color,
  inStock,
  author,
  disableUp,
  disableDown,
  onTitleChange,
  onInStockChange,
  onColorChange,
  onAuthorChange
}) => {
  return (
    <div className={styles.Book} style={{borderColor: color}}>
      <span className={styles.Toolbar}>
        <Color color={color} onChange={onColorChange} />
        {!disableUp && <button onClick={onMoveUp}><span role="img" aria-label="Move up">⬆</span></button>}
        {!disableDown && <button onClick={onMoveDown}><span role="img" aria-label="Move up">⬇</span></button>}
        <button onClick={onDelete}><span role="img" aria-label="Delete">✖️</span></button>
        <button onClick={onAddAfter}><span role="img" aria-label="Add after">➕</span></button>
      </span>
      <h2>
        <EditableText text={title} onChange={onTitleChange} />
        <Checkbox checked={inStock} onChange={onInStockChange} />
      </h2>
      <p>
        <EditableText text={author} onChange={onAuthorChange} />
      </p>
    </div>
  );
};

export default Book;
