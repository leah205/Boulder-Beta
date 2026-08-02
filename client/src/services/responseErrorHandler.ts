//meta?
import type { ValidationError } from "express-validator";
import type { AxiosError } from "axios";
import axios from "axios";
import { CustomValidationError, ServerError } from "@/utils/Error";

type Data = {
  errors?: ValidationError[];
  message?: string;
  user?: any;
};

export default function responseErrorHandler(error: AxiosError) {
  if (axios.isAxiosError(error)) {
    const response = error?.response;
    if (error.code == "ERR_NETWORK") {
      ("connection problems...");
    } else if (error.code == "ERR_CANCELED") {
      ("connection canceled");
    }
    if (response) {
      const statusCode = response?.status;
      if (statusCode == 400) {
        const data = "data" in response ? (response.data as Data) : null;
        console.log(data);
        if (data && data.errors?.length) {
          console.log(data.errors);
          throw new CustomValidationError(
            "invalid form entries",
            data.errors as ValidationError[],
          );
        }
        if (data && data.message) {
          throw new ServerError(data.message, 400);
        }
        ("user request malconfigured");
        throw new ServerError("User request malfigured", 400);
      }
      if (statusCode == 401) {
        throw new ServerError("Unauthorized", 401);
      }
      if (statusCode == 403) {
        throw new ServerError(
          "Forbidden. User does not have authorization to access this resource",
          403,
        );
      }
      if (statusCode == 404) {
        throw new ServerError("Requested resource does not exists", 404);
      } else {
        throw new ServerError("Server Error", 500);
      }
    }
  }

  throw new ServerError(
    "Sorry, something went wrong on our end. Please try again later",
    500,
  );
}
