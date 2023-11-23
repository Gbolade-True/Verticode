import { ReactNode, useState } from "react";
import { Options } from "../options";
import Input from "../input";
import ClickOutsideDiv from "../clickOutside";

export interface ISelectOptionsProps {
    value: string;
    label: string;
    [key: string]: any;
}

interface CustomSelectProps<I> extends React.InputHTMLAttributes<HTMLInputElement> {
    label: ReactNode;
    options: ISelectOptionsProps[];
    name: Extract<keyof I, string>;
    onSelectClick: (name: string, item: ISelectOptionsProps) => void
}


export const TypeOrSelect = <I,>({ id, name, label, options, onSelectClick, ...rest }: CustomSelectProps<I>) => {
  const [showOptions, setShowOptions] = useState(false);

  const matchingOption = options.find(
    (option) => option.label.toLowerCase().includes((rest.value as string).toLowerCase())
  ) && showOptions;

  return (
    <div className="mb-4">
        <ClickOutsideDiv handleClickOutside={() => setShowOptions(false)}>
            <Input
                label={label}
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                id={id}
                name={name}
                placeholder={`Type to search ${(label as string).toLowerCase()}...`}
                {...rest}
                onFocus={(e) => {rest.onFocus && rest.onFocus(e); setShowOptions(true); }}
                onChange={(e) => { rest.onChange && rest.onChange(e); !showOptions && setShowOptions(true) }}
                />
            {matchingOption ? 
            <Options<ISelectOptionsProps>
                key={rest.value as string}
                list={options.filter(o => rest.value ? o.label.toLowerCase().includes((rest.value as string).toLowerCase()) : true )}
                idKey='value'
                valueKey='label'
                name={name}
                onClick={(name, item) => {onSelectClick(name, item); setShowOptions(false)}}
            />: null}

        </ClickOutsideDiv>
    </div>
  );
};
