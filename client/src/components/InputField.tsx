import type React from "node_modules/@types/react/index";

type InputProps = {
  label: string;
  type: string;
  value?: string | number | null;
  className?: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

type WrapperProps = {
  name: string;
  label: string;
  children: React.ReactNode;
};

function getClass(type: string) {
  console.log(type);
  switch (type) {
    case "text":
      return " w-2/3 max-[800px]:w-5/6";
    case "number":
      return "w-2/3  max-[800px]:w-5/6";
    case "checkbox":
      return "";
  }
}

function InputWrapper(props: WrapperProps) {
  return (
    <div className={`py-2 flex gap-3 w-5/6 items-center`}>
      <label className="flex items-center" htmlFor={props.name}>
        {props.label}:
      </label>
      {props.children}
    </div>
  );
}

export default function InputField(props: InputProps) {
  const inputClass = getClass(props.type);
  return (
    <InputWrapper name={props.name} label={props.label}>
      <input
        className={`border-mist-300  border-2 rounded-xs shadow-xs ml-3 items-center ${props.className}  ${inputClass}`}
        type={props.type}
        onChange={props.onChange}
        id={props.name}
        name={props.name}
        value={props.value || ""}
      />
    </InputWrapper>
  );
}
