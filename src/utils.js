import jsonPatch from "fast-json-patch";

export const sendChanges = async (changes, lastKnownOperationId) => {
  const result = await fetch("http://localhost:3001/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patch: changes,
      lastKnownOperationId
    })
  });

  return await result.json();
};

export const clone = obj => JSON.parse(JSON.stringify(obj));

export const createChangeHandler = (
  lastKnownOperationIdRef,
  lastState,
  done
) => (type, path, from) => async value => {
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
    lastKnownOperationIdRef.current
  );

  const newState = jsonPatch.applyPatch(clone(lastState), result.changesToApply)
    .newDocument;

  lastKnownOperationIdRef.current = result.lastKnownOperationId;
  done(newState);
};

export const fetchInitialData = async (lastKnownOperationIdRef, done) => {
  const result = await fetch("http://localhost:3001/");
  const {
    state: newState,
    lastKnownOperationId: newId
  } = await result.json();

  lastKnownOperationIdRef.current = newId;
  done({ ...newState });
};
