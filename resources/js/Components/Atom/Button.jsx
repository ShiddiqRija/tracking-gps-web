export default function Button({
    type = "button",
    className = "",
    fullWidth = false,
    primary = false,
    danger = false,
    disabled,
    fullWidthDisabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex justify-center px-3 py-2 text-sm font-semibold rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    fullWidth
                        ? "w-full bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 text-white "
                        : ""
                } ${
                    primary
                        ? "w-fit bg-sky-500 disabled:bg-sky-200 hover:bg-sky-600 focus-visible:outline-sky-600 text-white "
                        : ""
                } ${danger ? "w-fit hover:bg-rose-100 text-rose-500" : ""} ${
                    disabled &&
                    "bg-sky-200 focus-visible:outline-sky-600 text-white cursor-default"
                } ${
                    fullWidthDisabled &&
                    "w-full bg-sky-200 focus-visible:outline-sky-600 text-white cursor-default "
                }` + className
            }
        >
            {children}
        </button>
    );
}
