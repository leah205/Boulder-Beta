const encodeCursor = (data) => {
  return Buffer.from(JSON.stringify(data)).toString("base64");
};

const decodeCursor = (cursor: string) => {
  if (!cursor) {
    return null;
  }

  const decoded = Buffer.from(cursor, "base64").toString("utf-8");
  return JSON.parse(decoded);
};

export { encodeCursor, decodeCursor };
