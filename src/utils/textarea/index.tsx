import { ReactNode } from 'react';

interface CustomTextareaProps<I> extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label: ReactNode;
    name: Extract<keyof I, string>;
}

export const Textarea = <I,>({ id, name, label, ...rest }: CustomTextareaProps<I>) => {

    return(
        <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-600">
          {label}{rest.required && '*'}
        </label>
        <textarea
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          id={id}
          name={name}
          {...rest}
        />
      </div>
    )
}