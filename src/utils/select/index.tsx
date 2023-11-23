import { ReactNode } from "react";
interface SelectOptionsProps {
    value: string;
    label: string;
    [key: string]: any;
}

interface CustomSelectProps<I> extends React.InputHTMLAttributes<HTMLSelectElement> {
    label: ReactNode;
    options: SelectOptionsProps[];
    name: Extract<keyof I, string>;
}


const Select = <I,>({ id, name, label, options, ...rest }: CustomSelectProps<I>) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}{rest.required && '*'}
      </label>
      <select
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        id={id}
        name={name}
        {...rest}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;