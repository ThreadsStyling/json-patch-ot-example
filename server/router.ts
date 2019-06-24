import Router from "koa-router";
import {applyPatch, deepClone} from "fast-json-patch";
import jsonPatchOT, { Operation } from "@threads/json-patch-ot";
import operations from "./db";

const router = new Router();

router.get("/", async ctx => {
  const [result] = applyPatch({}, deepClone(operations.get()));
  ctx.body = {
    state: result.newDocument,
    lastKnownOperationId: operations.get().length - 1
  };
});

router.post("/", async ctx => {
  const lastKnownOperationId: number = ctx.request.body.lastKnownOperationId;
  const patch: Operation[] = ctx.request.body.patch;
  const unknownChanges = operations.get().slice(lastKnownOperationId + 1);

  console.log('unknownChanges', unknownChanges);
  console.log('patch', patch);

  const transformedPatch = jsonPatchOT(unknownChanges, patch, {
    acceptedWinsOnEqualPath: true
  });

  console.log('transformedPatch', transformedPatch);

  operations.push(...transformedPatch);

  ctx.body = {
    changesToApply: [...unknownChanges, ...transformedPatch],
    lastKnownOperationId: operations.get().length - 1
  };
});

export default router;