import { Fragment, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import CheckIcon from "@mui/icons-material/Check";

export default function ComboBox({ data, onChange, selectedBy, showBy }) {
    const [selected, setSelected] = useState(data[0]);
    const [query, setQuery] = useState("");
    const inputRef = useRef();

    const filteredItem =
        query === ""
            ? data
            : data.filter((value) =>
                  value[showBy]
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    const handleChange = (selected) => {
        setSelected(selected);
        onChange(selected[selectedBy]);
        setTimeout(() => {
            inputRef.current.blur();
        }, 0);
    };

    return (
        <Combobox value={selected} onChange={(e) => handleChange(e)}>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(value) => value[showBy]}
                        onChange={(event) => {
                            setQuery(event.target.value);
                        }}
                        ref={inputRef}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <UnfoldMoreOutlinedIcon />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                        className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                        {filteredItem.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredItem.map((value) => (
                                <Combobox.Option
                                    key={value[selectedBy]}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-sky-500 text-white"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={value}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {value[showBy]}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active
                                                            ? "text-white"
                                                            : "text-teal-600"
                                                    }`}
                                                >
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}
