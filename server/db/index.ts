import fs from "fs";
import { Operation } from 'fast-json-patch';

const operations = {
  get: () => {
    const json = fs.readFileSync(__dirname + "/operations.json", "utf-8");
    return JSON.parse(json.toString());
  },
  push: (...newChanges: Operation[]) => {
    const changes = operations.get();
    changes.push(...newChanges);
    fs.writeFileSync(
      __dirname + "/operations.json",
      JSON.stringify(changes, null, "  ")
    );
  }
};

export default operations;
