import React from "react"

type SelectFieldProps = {
    name: string,
    children: React.ReactNode,
    options: string
    value: string
}


export default function SelectField<T>({name, children, values}: SelectFieldProps<T>){
    
    return (
    <div>
        <label htmlFor={name}></label>
        <select>
            {children}
        </select>
    </div>
    )
}