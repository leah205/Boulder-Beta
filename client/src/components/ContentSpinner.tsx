import { ClipLoader } from "react-spinners";

export default function ContentSpinner() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ClipLoader color="gray"></ClipLoader>;
    </div>
  );
}
