import { FadeLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="absolute  bg-mist-100 rounded-md w-30  justify-center items-center flex m-auto top-5 py-3 left-0 right-0">
      <FadeLoader
        className="ml-4"
        radius="1px"
        margin="0px"
        height="10px"
        width="4px"
        color="gray"
      ></FadeLoader>
    </div>
  );
}
