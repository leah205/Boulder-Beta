import { json } from "zod";

const encodeCursor = (data: any) => {
  return Buffer.from(JSON.stringify(data)).toString("base64");
};

const decodeCursor = (cursor: string) => {
  if (!cursor) {
    return null;
  }

  const decoded = Buffer.from(cursor, "base64").toString("utf-8");

  let res;
  try {
    res = JSON.parse(decoded);
  } catch {
    res = null;
  }
  return res;
};

export { encodeCursor, decodeCursor };
