import classNames from "classnames";

export const Button = (props) => {
    const {
        children,
        widthFit,
        iconOnly,
        variant,
        onClick,
        icon,
        disabled
    } = props;

    const solidClass = classNames('text-white bg-sky-400 hover:bg-sky-500 hover:scale-[1.02] transition ease-in-out duration-300')
    const outlineClass = classNames('text-gray-900  border-[2px] border-sky-400 hover:scale-[1.02] transition ease-in-out duration-300')
    const disabledClass = classNames('text-gray-400 bg-gray-200 hover:cursor-not-allowed')

    return (
        <button
            className={`${disabled ? disabledClass : variant === "solid" ? solidClass : variant === "outline" ? outlineClass : null} 
            ${widthFit ? "w-fit" : "w-full"}
            py-4 px-8 font-bold rounded-[8px] text-center`}
            onClick={onClick}
            disabled={disabled}
        >
            {iconOnly ? icon :
                <span className="flex items-center justify-center gap-2 text-sm"> {icon ?? ""} {children}</span>
            }

        </button>
    )
}