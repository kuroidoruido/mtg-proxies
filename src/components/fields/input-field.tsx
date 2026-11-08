interface InputFieldProps {
  type?: "number" | "text";
  label: string;
  value: number | string;
  onChange: (e: { target: HTMLInputElement }) => void;
}

export function InputField(props: InputFieldProps) {
  return (
    <label>
      {props.label}:{" "}
      <input
        type={props.type ?? "text"}
        value={props.value}
        onInput={props.onChange}
      />
    </label>
  );
}
