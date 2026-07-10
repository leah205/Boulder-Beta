type WrapperProps = {
  name: string;
  label: string;
  children: React.ReactNode;
};

export default function InputWrapper(props: WrapperProps) {
  return (
    <div className={`py-2 flex gap-3 w-5/6 items-center`}>
      <label className="flex items-center" htmlFor={props.name}>
        {props.label}:
      </label>
      {props.children}
    </div>
  );
}
