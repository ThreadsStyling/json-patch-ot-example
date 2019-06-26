import React, { useState, useEffect, useRef } from "react";
import Book from "./components/Book";
import EditableText from "./components/EditableText";
// import Checkbox from "./components/Checkbox";
import jsonPatch from "fast-json-patch";
import { sendChanges, clone } from "./utils";

const EMPTY_ENTRY = {
  title: "Enter title",
  author: "Enter author",
  color: "#cccccc",
  inStock: false
};

const App = () => {
  const [state, setState] = useState({ title: "Loading...", books: [] });
  const lastKnownOperationId = useRef(0);

  const createChangeHandler = (type, path, from) => {
    return async value => {
      if (value.target) value = undefined;

      const result = await sendChanges(
        [
          {
            op: type,
            path,
            from,
            value
          }
        ],
        lastKnownOperationId.current
      );

      const newState = jsonPatch.applyPatch(clone(state), result.changesToApply)
        .newDocument;

      lastKnownOperationId.current = result.lastKnownOperationId;
      setState(newState);
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3001/");
      const {
        state: newState,
        lastKnownOperationId: newId
      } = await result.json();

      lastKnownOperationId.current = newId;
      setState({ ...newState });
    };
    fetchData();
  }, []);

  return (
    <div>
      <header>
        <h1>
          <EditableText
            text={state.title}
            onChange={createChangeHandler("replace", "/title")}
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
          onMoveUp={createChangeHandler(
            "move",
            `/books/${i - 1}`,
            `/books/${i}`
          )}
          onMoveDown={createChangeHandler(
            "move",
            `/books/${i + 1}`,
            `/books/${i}`
          )}
          onDelete={createChangeHandler("remove", `/books/${i}`)}
          onTitleChange={createChangeHandler("replace", `/books/${i}/title`)}
          onAuthorChange={createChangeHandler("replace", `/books/${i}/author`)}
          onColorChange={createChangeHandler("replace", `/books/${i}/color`)}
          onInStockChange={createChangeHandler(
            "replace",
            `/books/${i}/inStock`
          )}
          onAddAfter={() =>
            createChangeHandler("add", `/books/${i + 1}`)(EMPTY_ENTRY)
          }
        />
      ))}
    </div>
  );
};

export default App;
