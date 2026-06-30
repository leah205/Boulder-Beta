//meta?
import type { ValidationError } from "express-validator";
import type { AxiosError } from "axios";
import axios from "axios";
import { CustomValidationError } from "../Error";

type Data = {
  errors?: ValidationError[];
  message?: string;
  user?: any;
};

export default function responseErrorHandler(error: AxiosError) {
  if (axios.isAxiosError(error)) {
    const response = error?.response;
    if (error.code == "ERR_NETWORK") {
      console.log("connection problems...");
    } else if (error.code == "ERR_CANCELED") {
      console.log("connection canceled");
    }
    if (response) {
      const statusCode = response?.status;
      if (statusCode == 400) {
        console.log(response);
        const data = "data" in response ? (response.data as Data) : null;
        if (data && "errors" in data) {
          throw new CustomValidationError(
            "invalid form entries",
            data.errors as ValidationError[],
          );
        }
        if (data && "message" in data && data.message) {
          throw new Error(data.message);
        }
        throw new Error("User request malfigured");
      }
      if (statusCode == 401) {
        throw new Error("Unauthorized");
      }
      if (statusCode == 403) {
        throw new Error(
          "Forbidden. User does not have authorization to access this resource",
        );
      }
      if (statusCode == 404) {
        throw new Error("Requested resource does not exists");
      } else {
        throw new Error("Server Error");
      }
    }
  }

  throw new Error(
    "Sorry, something went wrong on our end. Please try again later",
  );
}
