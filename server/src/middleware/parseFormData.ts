import type { Request, Response, NextFunction } from "express";

const parseFormData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (typeof value != "string") {
      data[key] = value;
      continue;
    }
    switch (key) {
      case "send":
        data[key] = eval(value);
        break;
      case "published":
        data[key] = eval(value);
        break;
      case "grade":
        data[key] = value.length ? value : null;
        break;
      case "clip":
        data[key] = null;
        break;
      case "height":
        data[key] = value.length ? Number(value) : undefined;
        break;
      case "picture":
        data[key] = null;
        break;
      default:
        data[key] = value;
    }
  }
  req.body = data;
  next();
};

export default parseFormData;
