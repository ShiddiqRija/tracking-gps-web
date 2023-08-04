import { useEffect } from "react";
import { useRef } from "react";
import { forwardRef } from "react";

export default forwardRef(function DateTimeInput(
    { className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type="datetime-local"
            className={
                "form-input rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 " +
                className
            }
            ref={input}
        />
    );
});
