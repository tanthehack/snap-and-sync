import { cloneElement } from 'react';
import * as Icon from "react-icons/fi"
import classNames from 'classnames';

export const Input = (props) => {
    const {
        id,
        placeholder = '',
        icon,
        label = '',
        type = 'text',
        error = false,
        errorText = '',
        readOnly = false,
        value,
        password,
        onBlur,
        onChange,
        onClick,
        required = false,
        ...rest
    } = props;

    const errorParentClass = classNames('border-red-300 focus-within:ring-red-50 focus-within:border-red-300 hover:border-red-500')
    const normalParentClass = classNames('focus-within:ring-sky-50 focus-within:border-sky-100 hover:border-sky-100');

    return (

        <div className='flex flex-col gap-3'>
            <label
                htmlFor={id}
                className="text-sm text-gray-900 font-semibold font-sm leading-none"
            >
                {label}
            </label>

            <div
                className={`${error ? errorParentClass : normalParentClass} bg-white border-2 border-gray-200 placeholder:text-gray-400 shadow-sm h-11 w-full 
        p-3 focus-within:ring-4 focus:outline-none rounded-lg w-it text-gray-900 flex items-center `}
            >

                {icon ?
                    cloneElement(icon, {
                        className: `w-[24px] h-[24px] mr-[8px] text-gray-400`
                    }) : null
                }

                <input
                    readOnly={readOnly}
                    type={type}
                    id={id}
                    className='placeholder:text-gray-400 h-fit focus:ring-0 focus:outline-none border-0 text-sm w-full p-0'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={placeholder}
                    {...rest}
                />

                {
                    password === true ? <Icon.FiEyeOff onClick={onClick} className='text-gray-400 w-4 h-4' />
                        : password === false ? <Icon.FiEye onClick={onClick} className='text-gray-400 w-4 h-4' />
                            : null
                }

            </div>
            {error ? errorText ? (
                <div className='flex items-center pt-1'>
                    <Icon.FiAlertCircle size={15} color='red' style={{ paddingRight: "3px" }} />
                    <p className='text-xs text-red-500'>{errorText}</p>
                </div>
            ) : null : null}
        </div>
    )
}