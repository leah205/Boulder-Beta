import type React from "node_modules/@types/react/index";

type InputProps = {
  type: string;
  value?: string | number | null;
  className?: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function getClass(type: string) {
  switch (type) {
    case "text":
      return " w-2/3 max-[800px]:w-5/6";
    case "number":
      return "w-2/3  max-[800px]:w-5/6";
    case "checkbox":
      return "";
  }
}

export default function InputField(props: InputProps) {
  const inputClass = getClass(props.type);
  return (
    <input
      className={`border-mist-300  border-2 p-2 rounded-xs shadow-xs ml-3 items-center ${props.className}  ${inputClass}`}
      type={props.type}
      onChange={props.onChange}
      id={props.name}
      name={props.name}
      value={props.value || ""}
    />
  );
}
