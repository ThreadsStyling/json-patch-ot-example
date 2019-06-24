export const sendChanges = async (changes, lastKnownOperationId) => {
  const result = await fetch("http://localhost:3001/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patch: changes,
      lastKnownOperationId,
    })
  });

  return await result.json();
};

export const clone = obj => JSON.parse(JSON.stringify(obj));
