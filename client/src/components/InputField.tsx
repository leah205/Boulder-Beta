interface Props {
  label: string;
  type: string;
  value: string;
  className?: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

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

export default function InputField(props: Props) {
  const inputClass = getClass(props.type);
  return (
    <div className={`py-2 flex gap-3 w-5/6 items-center`}>
      <label className="flex items-center" htmlFor={props.name}>
        {props.label}:
      </label>
      <input
        className={`border-mist-300  border-2 rounded-xs shadow-xs ml-3 items-center ${props.className}  ${inputClass}`}
        type={props.type}
        onChange={props.onChange}
        id={props.name}
        name={props.name}
        value={props.value}
      />
    </div>
  );
}
