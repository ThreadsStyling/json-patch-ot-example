import React, { useState, useEffect, useRef } from "react";
import Book from "./components/Book";
import EditableText from "./components/EditableText";
import { createChangeHandler, fetchInitialData } from "./utils";

const EMPTY_ENTRY = {
  title: "Enter title",
  author: "Enter author",
  color: "#cccccc",
  inStock: false
};

const App = () => {
  const [state, setState] = useState({ title: "Loading...", books: [] });
  const lastKnownOperationId = useRef(0);
  const changeHandler = createChangeHandler(lastKnownOperationId, state, setState);

  useEffect(() => fetchInitialData(lastKnownOperationId, setState), []);

  return (
    <div>
      <header>
        <h1>
          <EditableText
            text={state.title}
            onChange={changeHandler("replace", "/title")}
          />
        </h1>
      </header>
      {state.books.map(({ title, author, inStock, color }, i) => (
        <Book
          key={i}
          title={title}
          author={author}
          inStock={inStock}
          color={color}
          disableUp={i === 0}
          disableDown={i === state.books.length - 1}
          onMoveUp={changeHandler(
            "move",
            `/books/${i - 1}`,
            `/books/${i}`
          )}
          onMoveDown={changeHandler(
            "move",
            `/books/${i + 1}`,
            `/books/${i}`
          )}
          onDelete={changeHandler("remove", `/books/${i}`)}
          onTitleChange={changeHandler("replace", `/books/${i}/title`)}
          onAuthorChange={changeHandler("replace", `/books/${i}/author`)}
          onColorChange={changeHandler("replace", `/books/${i}/color`)}
          onInStockChange={changeHandler(
            "replace",
            `/books/${i}/inStock`
          )}
          onAddAfter={() =>
            changeHandler("add", `/books/${i + 1}`)(EMPTY_ENTRY)
          }
        />
      ))}
    </div>
  );
};

export default App;
