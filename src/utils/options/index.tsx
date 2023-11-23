import { ReactNode } from 'react'

interface OptionsProps<O> {
    idKey: keyof O
    valueKey: keyof O
    name: string;
    list: O[]
    onClick?: (name: string, item: O) => void
}

export const Options = <O,>({ name, list, idKey, valueKey, onClick = () => {} }: OptionsProps<O>) => {

    return (
        <div className='relative'>
            <ul className="w-full absolute left-0 overflow-y-auto max-h-44 p-2 mt-1 rounded-8 bg-white shadow-md">
                {
                    list?.map(listItem => {
                        return(
                            <li className="flex cursor-pointer p-2 rounded-8 items-center bg-white hover:bg-light-green" key={listItem?.[idKey] as string} onClick={() => onClick(name, listItem)}>
                                <span>{listItem?.[valueKey] as ReactNode}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
