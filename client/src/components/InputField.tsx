interface Props {
  label: string;
  type: string;
  value: string;
  className?: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function InputField(props: Props) {
  return (
    <div className="py-2 flex justify-between w-3/4 max-[800px]:w-10/12">
      <label className="flex items-center" htmlFor={props.name}>
        {props.label}:
      </label>
      <input
        className={`border-mist-300  border-2 rounded-xs shadow-xs ml-3 w-2/3 max-[800px]:w-5/6 items-center ${props.className}`}
        type="text"
        onChange={props.onChange}
        id={props.name}
        name={props.name}
        value={props.value}
      />
    </div>
  );
}
