import { ReactNode } from "react";

interface CustomInputProps<I> extends React.InputHTMLAttributes<HTMLInputElement> {
    label: ReactNode;
    name: Extract<keyof I, string>;
}


const Input = <I,>({ id, name, label, ...rest }: CustomInputProps<I>) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}{rest.required && '*'}
      </label>
      <input
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        id={id}
        name={name}
        {...rest}
      />
    </div>
  );
};

export default Input;