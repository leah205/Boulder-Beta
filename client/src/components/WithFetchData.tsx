import type React from "react";
import ContentSpinner from "./spinner/ContentSpinner";
import ErrorMessage from "./error/ErrorMessage";
import type { ServerError } from "@/utils/Error";
import { is } from "zod/v4/locales";

// type Config = {
//   isPending: boolean;
//   error: Error | ServerError;
// };

// export default function WithFetchData<P extends React.JSX.IntrinsicAttributes>(
//   config: Config,
//   WrappedComponent: React.ComponentType<P>,
// ) {
//   const NewComponent = (props: P) => {
//     if (config.isPending) {
//       return <ContentSpinner></ContentSpinner>;
//     }
//     if (config.error) {
//       return <ErrorMessage error={config.error}></ErrorMessage>;
//     }
//     return <WrappedComponent {...props}></WrappedComponent>;
//   };
//   return NewComponent;
// }

type Props = {
  children: React.ReactNode;
  isPending: boolean;
  error: ServerError | Error;
};

export default function WithFetchData({ children, isPending, error }: Props) {
  if (isPending) {
    return <ContentSpinner></ContentSpinner>;
  }
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }

  return children;
}
